const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    try {

        // ==========================================
        // Temporary user returned by the "backend"
        // ==========================================

        const user = {
            id: 1,
            username: username,
            fullName: "Dr. Brian Ngesa",
            role: "Doctor",
            token: "temporary-token"
        };

        // Save session
        sessionStorage.setItem("user", JSON.stringify(user));

        // Go to the application
        window.location.href = "/app.html";

    } catch (error) {

        alert("Login failed.");

        console.error(error);

    }

});