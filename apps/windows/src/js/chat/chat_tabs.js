import { loadContacts } from "./chat_api.js";
import { renderContacts } from "./chat_renderer.js";

const recentTab = document.getElementById("recent-tab");
const contactsTab = document.getElementById("contacts-tab");

const recentList = document.getElementById("chat-list");
const contactList = document.getElementById("contact-list");

let contactsLoaded = false;

recentTab.addEventListener("click", () => {

    recentTab.classList.add("active");
    contactsTab.classList.remove("active");

    recentList.classList.remove("hidden");
    contactList.classList.add("hidden");

});

contactsTab.addEventListener("click", async () => {

    contactsTab.classList.add("active");
    recentTab.classList.remove("active");

    contactList.classList.remove("hidden");
    recentList.classList.add("hidden");

    if (!contactsLoaded) {

        const user = JSON.parse(
            sessionStorage.getItem("user")
        );

        try {

            const contacts = await loadContacts(
                user.staff_id
            );

            renderContacts(contacts);

            contactsLoaded = true;

        } catch (err) {

            console.error(
                "Failed to load contacts",
                err
            );

        }

    }

});