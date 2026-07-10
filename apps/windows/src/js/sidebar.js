import { menus } from "./roles.js";
import { loadPage } from "./router.js";

export function buildSidebar(role){

    const nav = document.getElementById("sidebar-menu");

    nav.innerHTML = "";

    const menu = menus[role];

    menu.forEach((item,index)=>{

        const button = document.createElement("button");

        button.textContent = item.text;

        button.dataset.route = item.route;

        if(index===0){

            button.classList.add("active");

        }

        button.addEventListener("click",()=>{

            document
                .querySelectorAll("#sidebar-menu button")
                .forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            loadPage(item.route);

        });

        nav.appendChild(button);

    });

}