// Este script se ejecuta antes de la hidratación para detectar el tema del sistema
// y aplicar la clase correspondiente al elemento HTML para evitar parpadeos

(function() {
  var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var storedTheme = localStorage.getItem('theme');
  var themeToApply = storedTheme || (mediaQuery.matches ? 'dark' : 'light');

  if (themeToApply === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  var handleChange = function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleChange);
  }
})();
