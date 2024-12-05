const bgSelector = document.getElementById("bg-switcher");
const primarySelector = document.getElementById("primary-switcher");

const bgVar = '--dark-color';
const primaryVar = '--main-color';

const expirationDate = new Date();

expirationDate.setFullYear(expirationDate.getFullYear() + 100);

function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function checkCookie(name) {
    return getCookie(name) !== null;
}


function applyTheme(cookieVar, selector) {
    if (checkCookie(cookieVar)) {
        theme = getCookie(cookieVar)
        document.documentElement.style.setProperty(cookieVar, theme);
    } else {
        selector.selectedIndex = 0;
    }
}

bgSelector.addEventListener('change', function () {
    theme = bgSelector.value;
    document.documentElement.style.setProperty(bgVar, theme);
    document.cookie = `${bgVar}=${theme}; expires=${expirationDate}, 31 Dec 2024 23:59:59 GMT; path=/; SameSite=None; Secure;`;
});

primarySelector.addEventListener('change', function () {
    theme = primarySelector.value;
    document.documentElement.style.setProperty(primaryVar, theme);
    document.cookie = `${primaryVar}=${theme}; expires=${expirationDate}, 31 Dec 2024 23:59:59 GMT; path=/; SameSite=None; Secure;`;
});

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(primaryVar, primarySelector);
    applyTheme(bgVar, bgSelector);

    if (window.innerWidth <= 768) {
        let currentPath = window.location.pathname;
        let newPath = currentPath.replace(/[^/]*$/, "only-desktop.html");   
        window.location.href = newPath;
    }
});
