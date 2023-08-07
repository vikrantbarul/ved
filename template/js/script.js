// theme button
const themeToggle = document.querySelector('.nav-theme-btn');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    rootElement.setAttribute('data-vd-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    if (rootElement.getAttribute('data-vd-theme') === 'dark') {
        rootElement.setAttribute('data-vd-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        rootElement.setAttribute('data-vd-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// menu button
const dropdownButton = document.querySelector('.nav-dropdown-btn');
const dropdownContent = document.querySelector('.nav-content');
let dropdownActive = false;

dropdownButton.addEventListener('click', () => {
    dropdownActive = !dropdownActive;
    if (dropdownActive) {
        dropdownContent.style.display = 'block';
    } else {
        dropdownContent.style.display = 'none';
    }
});

// Close dropdown when clicking outside the navigation area
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!dropdownContent.contains(target) && !dropdownButton.contains(target)) {
        dropdownActive = false;
        dropdownContent.style.display = 'none';
    }
});