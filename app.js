const conteudo = document.getElementById("resultado");

function onScanSuccess(decodedText) {
    conteudo.innerHTML = decodedText;

    if (navigator.vibrate) navigator.vibrate(100);
}

function onScanError(errorMessage) {
    console.log("Erro: ", errorMessage);
}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if (!cameras || cameras.length === 0) return;

    const traseira = cameras.find(cam =>
        cam.label.toLowerCase().includes("back") ||
        cam.label.toLowerCase().includes("traseira") ||
        cam.label.toLowerCase().includes("rear")
    );

    const cameraId = traseira ? traseira.id : cameras[0].id;

    html5QrCode.start(
        cameraId,
        {
            fps: 15,
            qrbox: 350,
            videoConstraints: {
                facingMode: "environment"
            }
        },
        onScanSuccess,
        onScanError
    );
});
