import { getRecentChats } from "./chat_api.js";
import { renderRecentChats } from "./chat_renderer.js";

export async function loadRecentChats() {

    try {

        const user = JSON.parse(sessionStorage.getItem("user"));

        if (!user || !user.staff_id) {

            console.error("No authenticated user found.");

            return;

        }

        const chats = await getRecentChats(user.staff_id);

        renderRecentChats(chats);

    } catch (err) {

        console.error("Failed to load chats:", err);

    }

}