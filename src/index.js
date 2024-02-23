import Router from "/src/router/router.js";
const router = new Router();

window.addEventListener("popstate", () => {
    router.init();
});

document.addEventListener("changedRoute", e => {
    import("/src/pages".concat(e.detail.page).concat(".js")).then(page => page.init()).catch(console.log);
})
