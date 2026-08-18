// Light/dark theme switching.
//
// The palette itself lives in _sass/_custom.scss: light values on :root,
// dark values on :root[data-theme="dark"]. This script only flips the
// data-theme attribute and remembers the choice in localStorage.
//
// It is loaded synchronously in <head>, so the saved theme is applied
// before the page paints (no flash of the wrong theme).
(function () {
  var STORAGE_KEY = 'theme';

  var getPreferredTheme = function () {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) { /* storage unavailable */ }
    return 'light'; // Default to light theme
  };

  var applyTheme = function (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) { /* storage unavailable */ }

    var toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // Apply immediately, before the body renders.
  applyTheme(getPreferredTheme());

  // Wire up the toggle once the button exists.
  var initToggle = function () {
    var toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) {
      return;
    }
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
    toggleButton.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
