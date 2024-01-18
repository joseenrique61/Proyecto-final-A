var maxHeight;

$(document).ready(
    function () {
        maxHeight = document.getElementById("aguaBarBackground").getBoundingClientRect().height;
        setBarras();

        const flashScreen = document.getElementsByClassName("flash-screen")[0];

        document.getElementById("iconoCarga").addEventListener("animationend", function () {
            flashScreen.classList.add("flash-screen-hidden");
        });

        flashScreen.addEventListener("transitionend", function () {
            flashScreen.style.display = "none";
        });
    }
);

window.onresize = setBarras;

function setBarras() {
    setPosicionBarra("agua", 0.7);
    setPosicionBarra("temperatura", 0.8);

    setValorBarra("funcionamiento", getValorPorcentaje("funcionamiento", 0.8), 0.8);
    setValorBarra("progreso", getValorPorcentaje("progreso", 0), 0);
}

function setPosicionBarra(tipo, porcentaje) {
    const idBarra = tipo + "Bar";
    const barra = document.getElementById(idBarra);
    const rect = document.getElementById(idBarra + "Background").getBoundingClientRect();
    barra.style.bottom = window.innerHeight - (rect.y + rect.height) + "px";
    
    setValorBarra(tipo, getValorPorcentaje(tipo, porcentaje), porcentaje);
}

function setPorcentajeBarra(tipo, porcentaje, tiempo, callback) {
    const values = getValor(tipo);
    var value = values[0];
    var maxValue = values[1];

    var newValue = Math.round(porcentaje * maxValue);

    var arriba = newValue > value;

    const ms = tiempo / (Math.abs(newValue - value) / 2);

    var id = setInterval(frame, ms);

    function frame() {
        var completo = false;
        if (arriba) {
            if (value >= newValue) {
                completo = true;
                clearInterval(id);
                callback();
            } else {
                value += 2;
            }
        }
        else {
            if (value <= newValue) {
                completo = true;
                clearInterval(id);
                callback();
            } else {
                value -= 2;
            }
        }

        var porcentajeActual = value / maxValue;
        if (porcentajeActual < 0) {
            porcentajeActual = 0;
            value = 0;
        }

        if (!completo) {
            setValorBarra(tipo, value, porcentajeActual);
        }
    }
}

function getValor(tipo) {
    const idBarra = tipo + "Bar";
    const barra = document.getElementById(idBarra);

    var value;
    var maxValue;

    if (barra.classList.contains("vertical-bar-front")) {
        value = barra.getBoundingClientRect().height;
        maxValue = maxHeight;
    }
    else {
        value = barra.getBoundingClientRect().width;
        maxValue = document.getElementById(idBarra + "Background").getBoundingClientRect().width;
    }

    return [value, maxValue];
}

function getValorPorcentaje(tipo, porcentaje) {
    const maxValue = getValor(tipo)[1];
    return maxValue * porcentaje;
}

function setValorBarra(tipo, value, porcentaje) {
    const idBarra = tipo + "Bar";
    const idCantidad = tipo + "Cantidad";
    const idPorcentaje = tipo + "Porcentaje";

    changeGraphic(idBarra, value, porcentaje);
    setValues(idCantidad, porcentaje);

    const porcentajeText = document.getElementById(idPorcentaje);
    porcentajeText.textContent = Math.round(porcentaje * 100) + "%";
}

function changeGraphic(idBarra, value, porcentaje) {
    const barra = document.getElementById(idBarra);

    switch (idBarra) {
        case "aguaBar":
            barra.style.height = value + "px";
            break;
            
        case "temperaturaBar":
            barra.style.height = value + "px";
            barra.style.background = "linear-gradient(180deg, " + getColor(value, porcentaje) + ", rgb(0, 0, 255))"
            break;
        
        case "funcionamientoBar":
        case "progresoBar":
            barra.style.width = value + "px";
            break;
    }
}

function setValues(idCantidad, porcentaje) {
    const cantidad = document.getElementById(idCantidad);
    
    switch (idCantidad) {
        case "aguaCantidad":
            const maxAgua = 2000;
            cantidad.textContent = Math.round(maxAgua * porcentaje) + "L";
            break;
            
        case "temperaturaCantidad":
            const maxTemp = 400;
            cantidad.textContent = Math.round(maxTemp * porcentaje) + " °C";
            break;
            
        case "funcionamientoCantidad":
            const maxFuncionamiento = 450;
            cantidad.textContent = Math.round(maxFuncionamiento * porcentaje) + " MWe";
            break;
    }
}

function getColor(porcentaje) {
    const rojo = 255;
    const azul = 0;

    var string = "rgb(" + (rojo - 255 * (1 - porcentaje)) + ", 0, " + (azul + 255 * (1 - porcentaje)) + ")";
    return string
}