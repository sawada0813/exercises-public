document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    // worker による画像処理
    const worker = new Worker("./worker.js");

    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    originalCtx.drawImage(img, 0, 0);

    const outputData = new Uint8ClampedArray(data.length);

    worker.postMessage([outputData, img.width, img.height, data]);
    worker.onmessage = (message) => {
      const outputImageData = new ImageData(
        message.data,
        img.width,
        img.height,
      );
      filteredCtx.putImageData(outputImageData, 0, 0);
    };
  });
});
