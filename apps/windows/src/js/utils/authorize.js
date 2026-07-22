export function requireRole(requiredRole) {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {

        alert("Session expired.");

        window.location = "login.html";

        return false;

    }

    if (user.role !== requiredRole) {

        alert("Access denied.");

        return false;

    }

    return true;

}