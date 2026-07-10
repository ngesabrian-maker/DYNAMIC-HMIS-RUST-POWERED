export function checkSession() {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {

        window.location.href = "/login.html";

        return;

    }

    return user;

}

export function logout() {

    sessionStorage.clear();

    window.location.href = "/login.html";

}