function cambiaPagina() {
    const handleClick = document.getElementById("icona");
  
    handleClick.addEventListener("click", () => {
      router.navigate("/configurazione");
    });
  }
  
  cambiaPagina();