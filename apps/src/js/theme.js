const THEME_STORAGE_KEY = "theme";
let themeListenersBound = false;

function applyTheme(theme) {
    const resolvedTheme = theme === "dark" ? "dark" : "light";

    document.body.classList.toggle("dark-mode", resolvedTheme === "dark");
    document.documentElement.dataset.theme = resolvedTheme;
    localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme);
}

function handleThemeButtonClick(event) {
    const button = event.target.closest("#light-mode, #dark-mode");

    if (!button) {
        return;
    }

    if (button.id === "dark-mode") {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

export function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";

    applyTheme(savedTheme);

    if (!themeListenersBound) {
        document.addEventListener("click", handleThemeButtonClick);
        themeListenersBound = true;
    }
}

export function enableDarkMode() {
    applyTheme("dark");
}

export function enableLightMode() {
    applyTheme("light");
}