document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
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

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    originalCtx.drawImage(img, 0, 0);

    const kernelSize = 5;

    // 値は次のサイトから流用
    // cf: https://www.mitani-visual.jp/mivlog/imageprocessing/gf3r89.php
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    kernel.forEach((row, y) => {
      row.forEach((value, x) => {
        kernel[y][x] = value / 256;
      });
    });
    let kernelSum = 0;
    kernel.forEach((list) => {
      kernelSum += list.reduce((sum, element) => sum + element, 0);
    });

    for (let y = 0; y < kernelSize; y++) {
      for (let x = 0; x < kernelSize; x++) {
        kernel[y][x] /= kernelSum;
      }
    }

    const outputData = new Uint8ClampedArray(data.length);

    const width = img.width;
    const height = img.height;

    // for (let y = 0; y < height; y++) {
    //   for (let x = 0; x < width; x++) {
    //     let [r, g, b] = [0, 0, 0]
    //     for (let ky = 0; ky < kernelSize; ky++) {
    //       for (let kx = 0; kx < kernelSize; kx++) {
    //         const px = x + kx - Math.floor(kernelSize / 2)
    //         const py = y + ky - Math.floor(kernelSize / 2)
    //         if (0 <= px && px < width && 0 <= py && py < height) {
    //           const weight = kernel[ky][kx]
    //           const pixelIndex = (py * width + px) * 4
    //           r += data[pixelIndex] * weight
    //           g += data[pixelIndex + 1] * weight
    //           b += data[pixelIndex + 2] * weight
    //         }
    //       }
    //     }
    //     const index = (y * width + x) * 4
    //     outputData[index] = r / kernelSum
    //     outputData[index + 1] = g / kernelSum
    //     outputData[index + 2] = b / kernelSum
    //     outputData[index + 3] = data[index + 3] // アルファ値はそのまま
    //   }
    // }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let [r, g, b] = [0, 0, 0];
        kernel.forEach((kernelRow, kernelY) => {
          kernelRow.forEach((elem, kernelX) => {
            const py = y + kernelY - Math.floor(kernelSize / 2);
            const px = x + kernelX - Math.floor(kernelSize / 2);

            if (0 <= px && px < width && 0 <= py && py < height) {
              const weight = kernel[kernelY][kernelX];
              const pixelIndex = (py * width + px) * 4;
              r += data[pixelIndex] * weight;
              g += data[pixelIndex + 1] * weight;
              b += data[pixelIndex + 2] * weight;
            }
          });
        });
        const index = (y * width + x) * 4;
        outputData[index] = r / kernelSum;
        outputData[index + 1] = g / kernelSum;
        outputData[index + 2] = b / kernelSum;
        outputData[index + 3] = data[index + 3];
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
