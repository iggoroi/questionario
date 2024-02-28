export default class Router {
    router;

    constructor() {
        if (Router.instance) return Router.instance;
        this.routes = [
            { path: "", page: "/homepage", style: "/homepage" },
            { path: "/", page: "/homepage", style: "/homepage" },
            { path: "configurazione", page: "/configurazione", style: "/configurazione" },
            { path: "quest", page: "/quest", style: "/quest" },
            { path: "login", page: "/login", style: "/login" },
            { path: "signin", page: "/registrazione", style: "/registrazione" },
        ];
        this.init();
        Router.instance = this
        return this;
    }

    getCurrentURI() {
        const path = window.location.pathname;
        return path;
    }

    findRoute(uri) {
        const route = this.routes.find(route => route.path == uri[0])
        return route || { path: "404", page: "/404", style: "/404" };
    }

    init() {
        const path = this.getCurrentURI().split("/");
        const tokens = path.length > 1 ? path.splice(1) : "";

        this.load(...tokens);
    }

    async load(...uri) {
        const foundRoute = this.findRoute(uri);
        if (foundRoute === undefined) throw new Error("Route not found");
        console.log("/pages".concat(foundRoute.page).concat(".html"));

        await fetch("/pages".concat(foundRoute.page).concat(".html"))
            .then(res => res.text())
            .then(text => {
                const outlet = document.querySelector("outlet");
                const style = document.createElement("link");
                style.setAttribute("href", `${"/style".concat(foundRoute.style).concat(".css")}`);
                style.setAttribute("rel", "stylesheet");
                const page = document.createElement("page");
                page.innerHTML = text;
                outlet.replaceChildren(style);
                outlet.appendChild(page);
            })
            .catch(console.log)

        document.dispatchEvent(new CustomEvent("changedRoute", {
            detail: {
                path: foundRoute.path,
                page: foundRoute.page,
            }
        }));
    }

    navigate(uri) {
        window.history.pushState({}, '', uri);
        this.init();
    }
}
