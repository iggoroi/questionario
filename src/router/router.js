export default class Router {
    constructor() {
        this.routes = [
            { path: "", page: "/homepage" },
            { path: "pic1", page: "/pic1" },
        ];
        this.init();
    }

    getCurrentURI() {
        const path = window.location.pathname;
        return path;
    }

    findRoute(uri) {
        const route = this.routes.find(route => route.path == uri)
        return route || { path: "404", page: "/404" };
    }

    init() {
        const path = this.getCurrentURI().split("/");
        const tokens = path.length > 1 ? path.slice(1) : "";

        this.load(...tokens);
    }

    async load(...uri) {
        const foundRoute = this.findRoute(uri);
        if (foundRoute === undefined) throw new Error("Route not found");

        await fetch("./pages".concat(foundRoute.page).concat(".html"))
            .then(res => res.text())
            .then(text => document.querySelector("outlet").innerHTML = text)
            .catch(console.log)
    }

    navigate(uri) {
        window.history.pushState({}, '', uri);
        this.load(uri);
    }
}
