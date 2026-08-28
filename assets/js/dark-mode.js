// Light/dark theme switching.
//
// The palette itself lives in _sass/_custom.scss: light values on :root,
// dark values on :root[data-theme="dark"]. This script only flips the
// data-theme attribute and remembers an explicit choice in localStorage.
//
// It is loaded synchronously in <head>, so the saved theme is applied
// before the page paints (no flash of the wrong theme).
(function () {
  var STORAGE_KEY = 'theme';
  var THEME_COLOR = { light: '#ffffff', dark: '#0f1115' }; // keep in sync with --bg

  var readSavedTheme = function () {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) { /* storage unavailable */ }
    return null;
  };

  var applyTheme = function (theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Browser UI colour (mobile address bar etc.)
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEME_COLOR[theme]);
    }

    var toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // Apply immediately, before the body renders. Default to light.
  applyTheme(readSavedTheme() || 'light');

  // Wire up the toggle once the button exists.
  var initToggle = function () {
    var toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) {
      return;
    }
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

    toggleButton.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

      // Freeze CSS transitions for one frame so text and backgrounds switch
      // together (see .theme-switching in _sass/_custom.scss).
      root.classList.add('theme-switching');
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next); // only persist explicit choices
      } catch (e) { /* storage unavailable */ }
      var unfreeze = function () { root.classList.remove('theme-switching'); };
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(unfreeze);
      });
      window.setTimeout(unfreeze, 150); // rAF does not fire in background tabs
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
