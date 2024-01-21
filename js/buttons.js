var id;
var orden = ["detener", "ventilar", "evacuar", "llenar", "apagar", "emergencia"];
var siguiente = orden[0];

$(document).ready(
    function () {
        id = setInterval(alternarAlarma, 300);
        setAccionesBotones();
    }
);

function alternarAlarma() {
    const luz = document.getElementById("alerta");
    luz.classList.toggle("luz-alerta");
}

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
    setPorcentajeBarra("funcionamiento", 0.85, 2000, function() {});
    setPorcentajeBarra("progreso", 1, 3000, resetProgreso);
}

function ventilar() {
    setPorcentajeBarra("temperatura", 0.75, 1500, function() {});
    setPorcentajeBarra("funcionamiento", 0.77, 1500, function() {});
    setPorcentajeBarra("progreso", 1, 2500, resetProgreso);
}

function evacuarAgua() {
    setPorcentajeBarra("agua", 0, 6000, function() {});
    setPorcentajeBarra("temperatura", 0.8, 6000, function() {});
    setPorcentajeBarra("funcionamiento", 0.68, 6000, function() {});
    setPorcentajeBarra("progreso", 1, 7000, resetProgreso);
}

function llenarAgua() {
    setPorcentajeBarra("agua", 0.8, 5000, function() {});
    setPorcentajeBarra("temperatura", 0.6, 5000, function() {});
    setPorcentajeBarra("progreso", 1, 6000, resetProgreso);
}

function apagar() {
    setPorcentajeBarra("funcionamiento", 0, 2000, function() {});
    setPorcentajeBarra("temperatura", 0.3, 2000, function() {});
    setPorcentajeBarra("progreso", 1, 3000, function () {
        resetProgreso();
        document.getElementById("encendido").classList.toggle("luz-alerta");
    });
}

function emergencia() {
    clearInterval(id);
    setPorcentajeBarra("temperatura", 0.2, 2000, function() {});
    document.getElementById("alerta").classList.remove("luz-alerta");
}

function resetProgreso() {
    setValorBarra("progreso", 0, 0);
    habilitarBotones();
}