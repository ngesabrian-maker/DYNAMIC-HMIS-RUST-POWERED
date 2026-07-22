export function checkSession() {

    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (!token || !user) {

        window.location.replace("/login.html");
        return;

    }

    return JSON.parse(user);

}

export function logout() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("staff_cache");

    window.location.replace("/login.html");

}