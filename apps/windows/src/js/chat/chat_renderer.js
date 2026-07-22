import { openConversation } from "./chat_window.js";

const recentList = document.getElementById("chat-list");

const contactList = document.getElementById("contact-list");

let allChats = [];

let allContacts = [];

/* ==========================================
   RECENT CHATS
========================================== */

export function renderRecentChats(chats) {

    allChats = chats;

    renderChatList(chats);

}

function renderChatList(chats) {

    recentList.innerHTML = "";

    chats.forEach(chat => {

        recentList.insertAdjacentHTML(

            "beforeend",

            `
            <div class="chat-item" data-id="${chat.staff_id}">

                <div class="chat-details">

                    <strong>${chat.first_name} ${chat.last_name}</strong>

                    <small>${chat.last_message ?? ""}</small>

                </div>

                <div class="chat-meta">

                    ${
                        chat.unread > 0
                            ? `<span class="badge">${chat.unread}</span>`
                            : ""
                    }

                </div>

            </div>
            `

        );

    });

    recentList.querySelectorAll(".chat-item").forEach(item => {

        item.addEventListener("click", () => {

            const staffId = Number(item.dataset.id);

            const chat = allChats.find(

                c => c.staff_id === staffId

            );

            if (chat) {

                openConversation(chat);

            }

        });

    });

}

/* ==========================================
   CONTACTS
========================================== */

export function renderContacts(contacts) {

    allContacts = contacts;

    contactList.innerHTML = "";

    contacts.forEach(contact => {

        contactList.insertAdjacentHTML(

            "beforeend",

            `
            <div class="chat-item" data-id="${contact.staff_id}">

                <div class="chat-details">

                    <strong>

                        ${contact.first_name} ${contact.last_name}

                    </strong>

                    <small>

                        ${contact.role}

                    </small>

                </div>

            </div>
            `

        );

    });

    contactList.querySelectorAll(".chat-item").forEach(item => {

        item.addEventListener("click", () => {

            const staffId = Number(item.dataset.id);

            const contact = allContacts.find(

                c => c.staff_id === staffId

            );

            if (contact) {

                openConversation(contact);

            }

        });

    });

}

/* ==========================================
   SEARCH
========================================== */

export function filterChats(query) {

    query = query.trim().toLowerCase();

    if (

        !query

    ) {

        renderChatList(allChats);

        renderContacts(allContacts);

        return;

    }

    const filteredChats = allChats.filter(chat =>

        `${chat.first_name} ${chat.last_name}`

            .toLowerCase()

            .includes(query)

        ||

        (chat.role ?? "")

            .toLowerCase()

            .includes(query)

        ||

        (chat.last_message ?? "")

            .toLowerCase()

            .includes(query)

    );

    renderChatList(filteredChats);

    const filteredContacts = allContacts.filter(contact =>

        `${contact.first_name} ${contact.last_name}`

            .toLowerCase()

            .includes(query)

        ||

        (contact.role ?? "")

            .toLowerCase()

            .includes(query)

    );

    renderContacts(filteredContacts);

}

/* ==========================================
   CONVERSATION
========================================== */

export function renderConversation(messages) {

    const container = document.getElementById(

        "conversation-messages"

    );

    const user = JSON.parse(

        sessionStorage.getItem("user")

    );

    container.innerHTML = "";

    messages.forEach(message => {

        const mine =

            message.sender_id === user.staff_id;

        container.insertAdjacentHTML(

            "beforeend",

            `
            <div class="message ${mine ? "sent" : "received"}">

                <div class="message-text">

                    ${message.message_text}

                </div>

                <div class="message-time">

                    ${message.created_at.substring(11,16)}

                </div>

            </div>
            `

        );

    });

    container.scrollTop = container.scrollHeight;

}