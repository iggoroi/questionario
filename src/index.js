import Router from "./router/router.js";
const router = new Router();

window.addEventListener("popstate", () => {
    router.init();
});

document.addEventListener("changedRoute", e => {
    console.log(e)
    switch (e.detail.page) {
        case "": initHomepage();
        default: ;
    }
})

function initHomepage() {
    const aggiungi = document.querySelector("#aggiungi");

    aggiungi.addEventListener("click", () => {
        router.navigate("configurazione");
    });
}
