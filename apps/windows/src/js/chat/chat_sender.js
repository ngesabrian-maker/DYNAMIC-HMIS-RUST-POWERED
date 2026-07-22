import { sendMessage, loadConversation } from "./chat_api.js";
import { renderConversation } from "./chat_renderer.js";

console.log("chat_sender.js loaded");
export async function submitMessage(receiverId, text) {

    const message = text.trim();

    if (!message) return;

    const user = JSON.parse(sessionStorage.getItem("user"));

    try {

        await sendMessage(receiverId, message);

        const messages = await loadConversation(

            user.staff_id,

            receiverId

        );

        renderConversation(messages);

        document.getElementById("message-text").value = "";

    } catch (err) {

        console.error("Failed to send message:", err);

    }

}