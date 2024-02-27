import Router from "/src/router/router.js";
const router = new Router();

export function init() {
    document.querySelector("form").addEventListener("submit", e => {
        console.log("scemo", e.target)
        e.preventDefault();



    });
}
