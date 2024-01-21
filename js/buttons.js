var id;
var orden = ["detener", "ventilar", "evacuar", "llenar", "apagar", "emergencia"];
var siguiente = orden[0];

$(document).ready(
    function () {
        setAccionesBotones();
    }
);

function setAccionesBotones() {
    orden.forEach(element => {
        document.getElementById(element + "Btn").addEventListener("click", function () {
            setAccionBoton(element);
        });
    });
}

function setAccionBoton(tipo) {
    ocultarTooltips();

    if (!revisarOrden(tipo)) {
        return;
    }
    setSiguiente();
    deshabilitarBotones();

    switch (tipo) {
        case "detener":
            detenerTurbinas();
            break;
        case "ventilar":
            ventilar();
            break;
        case "evacuar":
            evacuarAgua();
            break;
        case "llenar":
            llenarAgua();
            break;
        case "apagar":
            apagar();
            break;
        case "emergencia":
            emergencia();
            break;
    }
}

function revisarOrden(tipo) {
    if (tipo != siguiente) {
        mostrarTooltip(siguiente);
        return false;
    }
    return true;
}

function setSiguiente() {
    siguiente = orden[orden.indexOf(siguiente) + 1];
}

function deshabilitarBotones() {
    orden.forEach(element => {
        document.getElementById(element + "Btn").classList.add("btn-disabled");
    });
}

function habilitarBotones() {
    for (var i = orden.indexOf(siguiente); i < orden.length; i++) {
        document.getElementById(orden[i] + "Btn").classList.remove("btn-disabled");
    }
}

function detenerTurbinas() {
    setPorcentajeBarra("temperatura", 0.86, 2000, function() {});
    setPorcentajeBarra("funcionamiento", 0.85, 2000, resetProgreso);
}

function ventilar() {
    setPorcentajeBarra("temperatura", 0.75, 1500, function() {});
    setPorcentajeBarra("funcionamiento", 0.77, 1500, resetProgreso);
}

function evacuarAgua() {
    setPorcentajeBarra("agua", 0, 6000, function() {});
    setPorcentajeBarra("temperatura", 0.7, 6000, function() {});
    setPorcentajeBarra("funcionamiento", 0.68, 6000, resetProgreso);
}

function llenarAgua() {
    setPorcentajeBarra("agua", 0.8, 6000, resetProgreso);
    setPorcentajeBarra("temperatura", 0.6, 6000, function() {});
}

function apagar() {
    setPorcentajeBarra("temperatura", 0.3, 2000, function() {});
    setPorcentajeBarra("funcionamiento", 0, 2000, resetProgreso);
}

function emergencia() {
    clearInterval(id);
    setPorcentajeBarra("temperatura", 0.2, 2000, function() {});
}

function resetProgreso() {
    habilitarBotones();
}