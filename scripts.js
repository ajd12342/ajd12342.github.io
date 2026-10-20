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

// Dropdown menu handling
function handleNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const links = Array.from(navLinks.children);
    
    // Function to check if nav items need to be moved to dropdown
    function updateNavigation() {
        const navWidth = navLinks.offsetWidth;
        const availableWidth = navLinks.parentElement.offsetWidth - 100; // Account for theme toggle and dropdown button
        let currentWidth = 0;
        
        // Reset all links
        links.forEach(link => {
            link.classList.remove('moved-to-dropdown');
            link.style.display = '';
        });
        dropdownMenu.innerHTML = '';
        
        if (window.innerWidth <= 768) {
            // Calculate which items need to be moved
            links.forEach((link, index) => {
                currentWidth += link.offsetWidth + 16; // Add gap
                if (currentWidth > availableWidth && index > 1) { // Keep at least 2 items in nav
                    link.classList.add('moved-to-dropdown');
                    const clonedLink = link.cloneNode(true);
                    dropdownMenu.appendChild(clonedLink);
                }
            });
        }
    }
    
    // Toggle dropdown
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });
    
    // Update on resize
    window.addEventListener('resize', updateNavigation);
    
    // Initial update
    updateNavigation();
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    handleNavigation();

    // CV click tracking: the link opens normally (no delayed window.open, which
    // pop-up blockers can stop); the beacon transport delivers the event anyway
    const cvLinks = document.querySelectorAll('a[href="/uploads/AnujDiwanCV.pdf"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'cv_click', {
                'event_category': 'CV',
                'event_label': link.getAttribute('aria-label') || 'CV Download',
                'value': 1,
                'transport_type': 'beacon'
            });
        });
    });
}); 