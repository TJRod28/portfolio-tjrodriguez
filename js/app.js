// ==========================
// THEME TOGGLE (shared by every page)
// Both index.html and about.html load this same file, and the choice is
// saved in localStorage, so the theme follows you from page to page.
// ==========================

// 1. APPLY THE SAVED THEME RIGHT AWAY
// This file loads in the <head>, before the page is drawn, so a dark-mode
// visitor never sees a white flash. The class goes on <html> because
// <body> doesn't exist yet at this point.
let savedTheme = null;
try {
    savedTheme = localStorage.getItem("portfolioTheme");
} catch (error) {
    savedTheme = null;   // storage is blocked: fall back to the default below
}

// No saved choice yet? Use the visitor's device setting (light or dark).
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const startDark = savedTheme === "dark" || (savedTheme === null && prefersDark);

if (startDark) {
    document.documentElement.classList.add("theme-dark");
}

// 2. HOOK UP THE BUTTON
// The button is further down the page, so wait until the HTML has loaded.
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    updateThemeButton(themeToggle);

    themeToggle.addEventListener("click", function() {
        document.documentElement.classList.toggle("theme-dark");
        updateThemeButton(themeToggle);

        const isDark = document.documentElement.classList.contains("theme-dark");
        try {
            localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
        } catch (error) {
            // Theme still switches; it just won't be remembered.
        }
    });
});

// 3. KEEP THE BUTTON TEXT AND aria-pressed IN SYNC
function updateThemeButton(button) {
    const isDark = document.documentElement.classList.contains("theme-dark");
    button.textContent = isDark ? "Light mode" : "Dark mode";
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
}