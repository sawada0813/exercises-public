onmessage = function (message) {
  console.log("worker received:", message);
  blur(message.data);
};

function blur([outputData, width, height, data]) {
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
  postMessage(outputData);
}
