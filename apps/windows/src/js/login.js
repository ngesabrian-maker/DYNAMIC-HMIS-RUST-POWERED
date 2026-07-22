const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Invalid email or password.");
            return;
        }

        // Save session
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/app.html";

    }catch (err) {

    console.error("FULL ERROR:", err);

    alert(err.message || err.toString());

}

});