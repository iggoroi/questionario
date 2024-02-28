export default class LoggedUser {
    static #username;
    static #password;

    static setUser(user) {
        if (user.username && user.password) {
            LoggedUser.#username = user.username;
            LoggedUser.#password = user.password;
        } else throw new Error("Login failed");
    }

    static getUser() {
        return LoggedUser.#username;
    }
}
