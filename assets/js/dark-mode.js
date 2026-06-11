// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return 'light'; // Default to light theme
};

// Apply theme to document
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    // Update the aria-label instead of text content
    toggleButton.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
    );
  }
};

// Initialize theme
const initializeTheme = () => {
  const theme = getPreferredTheme();
  applyTheme(theme);

  // Add click handler to toggle button
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}

// Re-run initialization when navigating between pages
document.addEventListener('turbolinks:load', initializeTheme); 