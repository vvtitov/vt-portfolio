// Este script se ejecuta antes de la hidratación para detectar el tema del sistema
// y aplicar la clase correspondiente al elemento HTML para evitar parpadeos

(function() {
  // Verificar si el usuario tiene una preferencia guardada
  const storedTheme = localStorage.getItem('theme');
  
  // Verificar la preferencia del sistema
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determinar el tema a aplicar
  let themeToApply;
  
  if (storedTheme) {
    // Si hay un tema guardado, usarlo
    themeToApply = storedTheme;
  } else {
    // Si no hay tema guardado, usar la preferencia del sistema
    themeToApply = systemPrefersDark ? 'dark' : 'light';
  }
  
  // Aplicar la clase al elemento HTML
  if (themeToApply === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Configurar un listener para cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Solo cambiar automáticamente si no hay una preferencia guardada
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
})();
