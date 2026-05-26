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
          background: "#09090b",
          statusBarStyle: "black-translucent",
        }
      : {
          themeColor: "#ffffff",
          background: "#ffffff",
          statusBarStyle: "default",
        };

  var root = document.documentElement;

  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  root.style.backgroundColor = tokens.background;

  if (document.body) {
    document.body.style.backgroundColor = tokens.background;
  }

  var themeColorMeta = document.getElementById("site-theme-color");

  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta");
    themeColorMeta.setAttribute("id", "site-theme-color");
    themeColorMeta.setAttribute("name", "theme-color");
    document.head.appendChild(themeColorMeta);
  }

  themeColorMeta.setAttribute("content", tokens.themeColor);

  var statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

  if (!statusBarMeta) {
    statusBarMeta = document.createElement("meta");
    statusBarMeta.setAttribute("name", "apple-mobile-web-app-status-bar-style");
    document.head.appendChild(statusBarMeta);
  }

  statusBarMeta.setAttribute("content", tokens.statusBarStyle);
})();
