import React, { useEffect, useRef, useState } from "react";
import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  Transform,
  Vec3,
  Camera,
} from "ogl";
import { useTheme } from "next-themes";

type MetaBallsProps = {
  color?: string;
  speed?: number;
  enableMouseInteraction?: boolean;
  hoverSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  cursorBallSize?: number;
  cursorBallColor?: string;
  enableTransparency?: boolean;
};

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash31(p: number): number[] {
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal =
    r[0] * (r_yzx[0] + 33.33) +
    r[1] * (r_yzx[1] + 33.33) +
    r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v: number[]): number[] {
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal =
    p[0] * (p_yxz[0] + 33.33) +
    p[1] * (p_yxz[1] + 33.33) +
    p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result: number[] = [];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

// Optimized shader with better performance
const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50]; // Precomputed: xy = position, z = radius
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
 
// Optimized metaball function that avoids division
float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = max(dot(d, d), 0.0001); // Avoid division by zero
    return r * r / dist2;
}
 
void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    
    float m1 = 0.0;
    for (int i = 0; i < iBallCount; i++) {
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
    float total = m1 + m2;
    
    // Optimized smoothstep calculation
    float threshold = 1.3;
    float f = smoothstep(-1.0, 1.0, (total - threshold) / min(1.0, fwidth(total)));
    
    vec3 cFinal = mix(vec3(0.0), mix(iColor, iCursorColor, m2 / max(total, 0.0001)), step(0.0, total));
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`;

type BallParams = {
  st: number;
  dtFactor: number;
  baseScale: number;
  toggle: number;
  radius: number;
};

const MetaBalls: React.FC<MetaBallsProps> = ({
  color = "#ffffff",
  speed = 0.6,
  enableMouseInteraction = true,
  hoverSmoothness = 2,
  animationSize = 20,
  ballCount = 10,
  clumpFactor = 1,
  cursorBallSize = 2,
  cursorBallColor = "#ffffff",
  enableTransparency = true,
}) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const mouseBallPosRef = useRef({ x: 0, y: 0 });
  const pointerStateRef = useRef({
    inside: false,
    x: 0,
    y: 0
  });
  const metaBallsUniformRef = useRef<Vec3[]>([]);
  const ballParamsRef = useRef<BallParams[]>([]);
  const isInitializedRef = useRef<boolean>(false);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(true);

  // Función para inicializar o reinicializar el canvas
  const initializeCanvas = () => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar canvas anterior si existe
    if (rendererRef.current && rendererRef.current.gl.canvas.parentNode) {
      rendererRef.current.gl.canvas.parentNode.removeChild(rendererRef.current.gl.canvas);
      rendererRef.current.gl.getExtension("WEBGL_lose_context")?.loseContext();
      rendererRef.current = null;
    }

    // Cancelar animación anterior si existe
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    // Use actual device pixel ratio for better rendering quality
    const dpr = Math.min(window.devicePixelRatio, 2);
    const renderer = new Renderer({
      dpr,
      alpha: true,
      premultipliedAlpha: false,
      antialias: true, // Add antialiasing for smoother edges
      powerPreference: 'high-performance', // Solicitar GPU de alto rendimiento
    });
    rendererRef.current = renderer;
    
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, {
      left: -1,
      right: 1,
      top: 1,
      bottom: -1,
      near: 0.1,
      far: 10,
    });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const isLightMode = theme === "light";
    const [r1, g1, b1] = isLightMode ? parseHexColor("#000000") : parseHexColor(color);
    const [r2, g2, b2] = isLightMode ? parseHexColor("#000000") : parseHexColor(cursorBallColor);

    // Pre-allocate metaballs array
    const metaBallsUniform: Vec3[] = [];
    for (let i = 0; i < 50; i++) {
      metaBallsUniform.push(new Vec3(0, 0, 0));
    }
    metaBallsUniformRef.current = metaBallsUniform;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    // Pre-compute ball parameters
    const maxBalls = 50;
    const effectiveBallCount = Math.min(ballCount, maxBalls);
    const ballParams: BallParams[] = [];
    for (let i = 0; i < effectiveBallCount; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const st = h1[0] * (2 * Math.PI);
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2.0);
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });
    }
    ballParamsRef.current = ballParams;

    // Realizar un resize inicial para configurar correctamente el tamaño
    handleResize();

    startTimeRef.current = performance.now();
    
    // Iniciar el bucle de animación
    startAnimationLoop(scene, camera, gl);
    
    isInitializedRef.current = true;
  };

  // Función para manejar el resize
  const handleResize = () => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const program = programRef.current;
    
    if (!container || !renderer || !program) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Solo actualizar si las dimensiones son válidas
    if (width > 0 && height > 0) {
      renderer.setSize(width, height);
      
      if (program.uniforms.iResolution) {
        program.uniforms.iResolution.value.set(
          renderer.gl.canvas.width,
          renderer.gl.canvas.height,
          0
        );
      }
      
      // Asegurar que el canvas sea visible
      setCanvasVisible(true);
    } else {
      // Si las dimensiones no son válidas, ocultar el canvas
      setCanvasVisible(false);
    }
  };

  // Función para iniciar el bucle de animación
  const startAnimationLoop = (scene: Transform, camera: Camera, gl: any) => {
    const program = programRef.current;
    const renderer = rendererRef.current;
    
    if (!program || !renderer) return;
    
    const update = (t: number) => {
      if (!program || !renderer || !canvasVisible) {
        animationFrameIdRef.current = requestAnimationFrame(update);
        return;
      }
      
      animationFrameIdRef.current = requestAnimationFrame(update);
      
      // Calcular tiempo transcurrido con un factor de suavizado para evitar saltos
      const elapsed = (t - startTimeRef.current) * 0.001;
      program.uniforms.iTime.value = elapsed;

      // Actualizar posiciones de metaballs con interpolación más suave
      const effectiveBallCount = Math.min(ballCount, 50);
      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParamsRef.current[i];
        const dt = elapsed * speed * p.dtFactor;
        const th = p.st + dt;
        
        // Usar funciones sin optimizaciones agresivas para mayor fluidez
        const x = Math.cos(th);
        const y = Math.sin(th + dt * p.toggle);
        
        const posX = x * p.baseScale * clumpFactor;
        const posY = y * p.baseScale * clumpFactor;
        
        metaBallsUniformRef.current[i].set(posX, posY, p.radius);
      }

      // Actualizar posición del cursor con interpolación más precisa
      let targetX: number, targetY: number;
      if (pointerStateRef.current.inside) {
        targetX = pointerStateRef.current.x;
        targetY = pointerStateRef.current.y;
      } else {
        const cx = gl.canvas.width * 0.5;
        const cy = gl.canvas.height * 0.5;
        const rx = gl.canvas.width * 0.15;
        const ry = gl.canvas.height * 0.15;
        
        // Usar movimiento más fluido para el cursor automático
        targetX = cx + Math.cos(elapsed * speed * 0.5) * rx;
        targetY = cy + Math.sin(elapsed * speed * 0.5) * ry;
      }
      
      // Usar un factor de suavizado adaptativo basado en el tiempo entre frames
      const deltaTime = Math.min(1/30, 1/60); // Limitar a un mínimo de 30fps para evitar saltos
      const adaptiveSmoothness = Math.min(1.0, hoverSmoothness * deltaTime * 60);
      
      mouseBallPosRef.current.x += (targetX - mouseBallPosRef.current.x) * adaptiveSmoothness;
      mouseBallPosRef.current.y += (targetY - mouseBallPosRef.current.y) * adaptiveSmoothness;
      
      program.uniforms.iMouse.value.set(
        mouseBallPosRef.current.x, 
        mouseBallPosRef.current.y, 
        0
      );

      // Renderizar la escena
      renderer.render({ scene, camera });
    };
    
    animationFrameIdRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    // Inicializar el canvas
    initializeCanvas();
    
    const container = containerRef.current;
    if (!container) return;

    // Configurar el ResizeObserver para detectar cambios en el contenedor
    const resizeObserver = new ResizeObserver((entries) => {
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = window.setTimeout(() => {
        // Si el contenedor tiene dimensiones válidas pero el canvas no está visible,
        // reinicializar completamente
        const entry = entries[0];
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          if (!canvasVisible || !isInitializedRef.current) {
            initializeCanvas();
          } else {
            handleResize();
          }
        } else {
          setCanvasVisible(false);
        }
      }, 100);
    });
    
    resizeObserver.observe(container);
    resizeObserverRef.current = resizeObserver;
    
    // Configurar event listeners para el mouse
    function onPointerMove(e: PointerEvent) {
      if (!enableMouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      
      if (rendererRef.current && rendererRef.current.gl) {
        const gl = rendererRef.current.gl;
        pointerStateRef.current.x = (px / rect.width) * gl.canvas.width;
        pointerStateRef.current.y = (1 - py / rect.height) * gl.canvas.height;
      }
      
      // Actualizar posición del mouse para el texto
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    
    function onPointerEnter() {
      if (!enableMouseInteraction) return;
      pointerStateRef.current.inside = true;
      setIsPointerInside(true);
    }
    
    function onPointerLeave() {
      if (!enableMouseInteraction) return;
      pointerStateRef.current.inside = false;
      setIsPointerInside(false);
    }
    
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    
    // Manejar cambios de visibilidad de la página
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Si la página vuelve a ser visible y el canvas debería estar visible pero no lo está
        if (!isInitializedRef.current && containerRef.current && containerRef.current.clientWidth > 0) {
          initializeCanvas();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (rendererRef.current && rendererRef.current.gl.canvas.parentNode) {
        rendererRef.current.gl.canvas.parentNode.removeChild(rendererRef.current.gl.canvas);
        rendererRef.current.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      
      rendererRef.current = null;
      programRef.current = null;
      isInitializedRef.current = false;
    };
  }, [
    color,
    cursorBallColor,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    enableTransparency,
    theme,
  ]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isPointerInside && (
        <div 
          className={`fixed pointer-events-none text-xs font-bold z-50 ${theme === "light" ? "text-black" : "text-white"}`}
          style={{
            left: `${mousePosition.x + 25}px`,
            top: `${mousePosition.y - 15}px`,
            textShadow: '0 0 3px rgba(0,0,0,0.8)',
            transform: 'rotate(-5deg)',
            transition: 'transform 0.1s ease-out'
          }}
        >
          woops!
        </div>
      )}
    </div>
  );
};

export default MetaBalls;
