export function init() {
    const data = window.location.pathname.split("/").splice(2);

    console.log(data)
    fetch("/data/".concat(data[0]).concat(".json"))
        .then(res => res.json())
        .then(DOMgen)
        .catch(console.log)
}

function DOMgen(questionario) {
    document.querySelector("#titolo").innerHTML = questionario.titolo;
    document.querySelector("#owner").innerHTML = "Created by: ".concat(questionario.owner);
    const domande = questionario.domande;
    const form = document.querySelector("#form");
    domande.forEach(domanda => {
        const domandaElement = document.createElement("fieldset");
        const testo = document.createElement("h2");
        testo.classList.add("title-1")
        testo.textContent = domanda.testo;
        domandaElement.appendChild(testo);
        switch (domanda.tipo) {
            case "radio":
            case 'checkbox': {
                {
                    domanda.opzioni.forEach(opzione => {
                        const input = document.createElement('input');
                        (input.type = domanda.tipo);
                        input.name = domanda.testo;
                        input.value = opzione;
                        input.id = opzione;
                        const label = document.createElement('label');
                        (label.for = opzione);
                        label.classList.add('title-3');
                        label.appendChild(input);
                        label.append(opzione);
                        domandaElement.appendChild(label);
                    });
                }
                break;
            }
            case 'textarea': {
                {
                    const input = document.createElement('textarea');
                    domandaElement.appendChild(input);
                }
                break;
            }
            default: {
                const input = document.createElement("input");
                input.type = domanda.tipo;
                input.name = domanda.testo;
                domandaElement.appendChild(input);
            }
        }
        form.appendChild(domandaElement);
    });
    const submit = document.createElement("button");
    submit.type = "submit";
    const icona = document.createElement("icon")
    icona.className = "nf nf-fa-send"
    submit.appendChild(icona)
    submit.append("Invia");
    submit.addEventListener("submit", e => { e.preventDefault(); })
    form.appendChild(submit);
}
