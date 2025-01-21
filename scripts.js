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

    // CV click tracking
    const cvLinks = document.querySelectorAll('a[href="/uploads/AnujDiwanCV.pdf"]');
    console.log('Found CV links:', cvLinks.length);  // Debug log
    
    cvLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent the default action temporarily to ensure the event fires
            e.preventDefault();
            
            console.log('CV link clicked:', link.getAttribute('aria-label')); // Debug log
            
            // Send GA event
            gtag('event', 'cv_click', {
                'event_category': 'CV',
                'event_label': link.getAttribute('aria-label') || 'CV Download',
                'value': 1
            });

            // Continue with download after a small delay to ensure event is sent
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 100);
        });
    });
}); 