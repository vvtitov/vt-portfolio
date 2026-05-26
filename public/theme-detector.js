(function () {
  var stored = localStorage.getItem("theme");
  var resolved = "light";

  if (stored === "dark" || stored === "light") {
    resolved = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    resolved = "dark";
  }

  var tokens =
    resolved === "dark"
      ? {
          themeColor: "#09090b",
          background: "hsl(240 10% 3.9%)",
          statusBarStyle: "black-translucent",
        }
      : {
          themeColor: "#ffffff",
          background: "hsl(0 0% 100%)",
          statusBarStyle: "default",
        };

  var root = document.documentElement;

  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  root.style.backgroundColor = tokens.background;

  if (document.body) {
    document.body.style.backgroundColor = tokens.background;
  }

  document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
    meta.remove();
  });

  var themeColorMeta = document.createElement("meta");
  themeColorMeta.setAttribute("name", "theme-color");
  themeColorMeta.setAttribute("content", tokens.themeColor);
  document.head.appendChild(themeColorMeta);

  var statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

  if (!statusBarMeta) {
    statusBarMeta = document.createElement("meta");
    statusBarMeta.setAttribute("name", "apple-mobile-web-app-status-bar-style");
    document.head.appendChild(statusBarMeta);
  }

  statusBarMeta.setAttribute("content", tokens.statusBarStyle);
})();
