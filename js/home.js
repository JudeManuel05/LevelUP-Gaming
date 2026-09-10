function actualizarContador() {
    let ahora = new Date();
    let medianoche = new Date();
    medianoche.setHours(24, 0, 0, 0);

    let diferencia = medianoche - ahora;

    let horas = Math.floor(diferencia / (1000 * 60 * 60));
    let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    let segundos = Math.floor((diferencia / 1000) % 60);

    if (horas < 10) { horas = "0" + horas; }
    if (minutos < 10) { minutos = "0" + minutos; }
    if (segundos < 10) { segundos = "0" + segundos; }

    document.getElementById("contador").innerHTML = horas + ":" + minutos + ":" + segundos;
}

setInterval(actualizarContador, 1000);
actualizarContador();