const app = document.getElementById("app");

export async function loadPage(page) {

    try {

        const response = await fetch(`/pages/${page}.html`);

        if (!response.ok) {

            throw new Error("Page not found");

        }

        app.innerHTML = await response.text();

    }

    catch(error){

        app.innerHTML = `
            <div class="page">

                <h2>404</h2>

                <p>${error.message}</p>

            </div>
        `;

    }

}