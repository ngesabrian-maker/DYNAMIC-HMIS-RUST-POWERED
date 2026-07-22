import { loadConversation } from "./chat_api.js";
import { renderConversation } from "./chat_renderer.js";
import { submitMessage } from "./chat_sender.js";
let activeChat = null;

export async function openConversation(chat) {

    activeChat = chat;

    document.getElementById("chat-home")
        .classList.add("hidden");

    document.getElementById("chat-conversation")
        .classList.remove("hidden");

    document.getElementById("conversation-name").textContent =
        `${chat.first_name} ${chat.last_name}`;

    document.getElementById("conversation-role").textContent =
        chat.role;

    try {

        const user = JSON.parse(sessionStorage.getItem("user"));

        const messages = await loadConversation(

            user.staff_id,

            chat.staff_id

        );

        renderConversation(messages);

    } catch (err) {

        console.error("Failed to load conversation:", err);

    }

}

export function getActiveChat() {

    return activeChat;

}
document
    .getElementById("send-message")
    .addEventListener("click", async () => {

        if (!activeChat) {
            console.error("No active conversation");
            return;
        }

        const input = document.getElementById("message-text");

        await submitMessage(
            activeChat.staff_id,
            input.value
        );

    });
