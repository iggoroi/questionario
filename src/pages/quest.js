export function init() {
    const data = window.location.pathname.split("/").splice(2);

    console.log(data)
    fetch("/data/".concat(data[0]).concat(".json"))
        .then(res => res.json())
        .then(console.log)
        .catch(console.log)
}
