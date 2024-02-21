export default class Router {
    constructor() {
        this.routes = [
            { path: "", page: "/homepage", style: "/homepage" },
            { path: "pic1", page: "/pic1", style: "/pic1" },
        ];
        this.init();
    }

    getCurrentURI() {
        const path = window.location.pathname;
        return path;
    }

    findRoute(uri) {
        const route = this.routes.find(route => route.path == uri)
        return route || { path: "404", page: "/404", style: "/404" };
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
            .then(text => {
                const outlet = document.querySelector("outlet");
                const style = document.createElement("link");
                style.setAttribute("href", `${"/style".concat(foundRoute.style).concat(".css")}`);
                style.setAttribute("rel", "stylesheet");
                const page = document.createElement("page");
                page.innerHTML = text;
                outlet.appendChild(style)
                outlet.appendChild(page)

            })
            .catch(console.log)
    }

    navigate(uri) {
        window.history.pushState({}, '', uri);
        this.load(uri);
    }
}
