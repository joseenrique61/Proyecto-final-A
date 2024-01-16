$(document).ready(
    setAccionesBotones()
);

function setAccionesBotones() {
    document.getElementById("evacuarBtn").addEventListener("click", evacuarAgua);
}

function evacuarAgua() {
    setPorcentajeBarra("agua", 0, 60, llenarAgua);
    setPorcentajeBarra("temperatura", 0.7, 120, function() {});
    setPorcentajeBarra("progreso", 1, 60, function() {});
}

function llenarAgua() {
    setPorcentajeBarra("agua", 0.8, 80, function() {});
}