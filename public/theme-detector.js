(function () {
  var stored = localStorage.getItem("theme");
  var root = document.documentElement;
  var resolved = "light";

  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
    resolved = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    resolved = "dark";
  }

  root.style.colorScheme = resolved;

  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta");
    themeColorMeta.setAttribute("name", "theme-color");
    document.head.appendChild(themeColorMeta);
  }

  themeColorMeta.setAttribute("content", resolved === "dark" ? "#09090b" : "#ffffff");
})();
