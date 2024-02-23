import Router from "/src/router/router.js";
const router = new Router();

export function init() {
    document.querySelector("#aggiungi").addEventListener("click", () => {
        router.navigate("configurazione");
    });

    fetch("/data/questionari.json")
        .then(data => data.json())
        .then(json => {
            json.forEach(quest => {
                const url = quest.url;
                const card = document.createElement("div");
                card.innerHTML = `
                    <div class="icona">
                        <div style="background: linear-gradient(45deg, ${quest.colors[0]}, ${quest.colors[1]})"></div>
                    </div>
                    <h2 class="title-2 enphatized">${quest.nome}</h2>
                `
                card.addEventListener("click", _ => {
                    router.navigate("/quest/".concat(url.split("/").pop()));
                })
                document.querySelector("main").appendChild(card);
            });
        })
        .catch(console.log);
}
