(function () {
  var stored = localStorage.getItem("theme");
  var root = document.documentElement;
  var resolved = "light";

  if (stored === "dark" || stored === "light") {
    resolved = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    resolved = "dark";
  }

  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;

  document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
    meta.remove();
  });

  var themeColorMeta = document.createElement("meta");
  themeColorMeta.setAttribute("name", "theme-color");
  themeColorMeta.setAttribute("content", resolved === "dark" ? "#09090b" : "#ffffff");
  document.head.appendChild(themeColorMeta);
})();
