const textoReconocidoElement = document.querySelector("p")
const boton = document.querySelector("button")
function controlarMusica(texto){
    if (texto.includes("reproducir")){
        Audio.play()
    }else if (texto.includes("pausar")){
        Audio.pause()
    }
}
function repetirTexto(texto){
    const letra = texto
    const synth = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(letra);
    synth.speak(speechUtterance);
}
if ("webkitSpeechRecognition" in window){
    const reconocimiento = new webkitSpeechRecognition();

    reconocimiento.continuous = true;
    reconocimiento.lang = "es-ES" // Cambia el idioma según tus necesidades

    reconocimiento.onstart = function (){
        textoReconocidoElement.textContent = "Escuchando...";
    };

    reconocimiento.onresult = function (event){
        const resultado = event.results[event.results.length - 1];
        const texto = resultado[0].transcript;
        textoReconocidoElement.textContent = `Texto reconocido; ${texto}`;
    };
    reconocimiento.onend = function () {

        let miTexto = textoReconocidoElement.textContent

        textoReconocidoElement.textContent += ' (Fin del reconocimiento)';

        repetirTexto(miTexto)
        controlarMusica(miTexto)

    };

    iniciarReconocimientoboton.addEventListener("click", function () {

        reconocimiento.start();

    });

} 