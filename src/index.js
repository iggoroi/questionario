import Router from "./router/router.js"
const router = new Router();

window.addEventListener('popstate', () => {
    router.init();
});
