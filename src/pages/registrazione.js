import Router from "/src/router/router.js";
import LoggedUser from "/src/user/user.js";
const router = new Router();

export function init() {
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll("input");
        const user = {
            username: inputs[0].value,
            password: inputs[1].value,
        }
        hashString(username)
            .then(hash => {
                localStorage.setItem(hash, JSON.stringify(user));
                LoggedUser.setUser(user);
            }).then(router.navigate("/"))
            .catch(console.log);
    });
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
