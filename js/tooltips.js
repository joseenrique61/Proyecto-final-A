function mostrarTooltip(tipo) {
    const tooltip = document.getElementById(tipo + "Tooltip");
    tooltip.classList.remove("tooltip-pers-hidden");
}

function ocultarTooltips() {
    orden.forEach(element => {
        if (element == "emergencia") {
            return;
        }
        
        const tooltip = document.getElementById(element + "Tooltip");
        tooltip.classList.add("tooltip-pers-hidden");
    });
}