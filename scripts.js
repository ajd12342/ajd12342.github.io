// Dark mode handling
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        updateThemeIcon(savedTheme === 'dark');
    } else {
        const isDark = prefersDarkScheme.matches;
        document.body.dataset.theme = isDark ? 'dark' : 'light';
        updateThemeIcon(isDark);
    }
}

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    updateThemeIcon(!isDark);
});

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
}); 