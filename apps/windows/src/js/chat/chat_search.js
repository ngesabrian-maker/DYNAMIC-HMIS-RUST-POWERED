import { filterChats } from "./chat_renderer.js";

const search = document.getElementById("staff-search");
console.log("chat_search.js loaded");
search.addEventListener("input", () => {

    filterChats(search.value);

});