document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").onclick = function () {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (username === 'admin' && password === 'admin') {
            window.location.href='/';
            /* router.navigate('/'); */
        }else{
            alert("Credenziali errate!");
        }
    };
});z
