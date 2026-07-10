const chatBtn = document.getElementById("chat-btn");
const chatPanel = document.getElementById("chat-panel");
const closeChat = document.getElementById("close-chat");

chatBtn.addEventListener("click", () => {
    chatPanel.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
    chatPanel.classList.add("hidden");
});