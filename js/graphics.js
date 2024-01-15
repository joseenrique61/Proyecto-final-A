$(document).ready(
    setBarras()
);

function setBarras() {
    setBarra("barAgua");
    setBarra("barTemperatura");
}

function setBarra(nombreElemento) {
    const barra = document.getElementById(nombreElemento);
    const rect = document.getElementById(nombreElemento + "Background").getBoundingClientRect();
    barra.style.height = rect.height + "px";
    barra.style.bottom = window.innerHeight - (rect.y + rect.height) + "px";
    console.log(rect.y);
    console.log(rect.height);
}