const video = document.getElementById("camera");
const input = document.getElementById("codigo");
const btn = document.getElementById("btnScan");

btn.onclick = async () => {

    // Abre a câmera
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
    });

    video.srcObject = stream;

    // Verifica se o navegador suporta BarcodeDetector
    if (!("BarcodeDetector" in window)) {
        alert("Seu navegador não suporta BarcodeDetector.");
        return;
    }

    const detector = new BarcodeDetector({
        formats: ["ean_13", "ean_8", "code_128", "upc_a"]
    });

    // Faz leitura contínua
    setInterval(async () => {
        try {
            const barcodes = await detector.detect(video);

            if (barcodes.length > 0) {
                const codigo = barcodes[0].rawValue;
                input.value = codigo;

                // Opcional: vibra no celular ao detectar
                if (navigator.vibrate) navigator.vibrate(100);
            }

        } catch (e) {
            console.log("Erro ao detectar:", e);
        }
    }, 300);
};
