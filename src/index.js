import Router from "./router/router.js"
const router = new Router();

window.addEventListener('popstate', () => {
    router.init();
});

const handleClick = document.getElementById("icona");

handleClick.addEventListener('click', () => {
    router.navigate("/configurazione");
  });
