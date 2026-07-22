import { loadRecentChats } from "./chat_loader.js";
import "./chat_search.js";
import "./chat_tabs.js";

const chatBtn = document.getElementById("chat-btn");
const chatPanel = document.getElementById("chat-panel");
const closeChat = document.getElementById("close-chat");

const chatHome = document.getElementById("chat-home");
const chatConversation = document.getElementById("chat-conversation");
const backChat = document.getElementById("back-chat");

chatBtn.addEventListener("click", async () => {

    chatPanel.classList.toggle("hidden");

    if (!chatPanel.classList.contains("hidden")) {

        // Always start from the home screen
        chatHome.classList.remove("hidden");
        chatConversation.classList.add("hidden");

        await loadRecentChats();

    }

});

closeChat.addEventListener("click", () => {

    chatPanel.classList.add("hidden");

});

backChat.addEventListener("click", () => {

    chatConversation.classList.add("hidden");

    chatHome.classList.remove("hidden");

});