onmessage = function (event) {
  // (x, y) から size の辺を持つ三角形を depth 回描画する
  const { height, width, size, depth } = event.data
  const x = width / 2
  const y = height / 2
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')

  function drawSierpinski(x, y, size, depth) {
    if (depth === 0) {
      ctx.beginPath()
      ctx.moveTo(x, y)// 300, 300
      ctx.lineTo(x + size, y) // 600, 300
      ctx.lineTo(x + size / 2, y - (size * Math.sqrt(3)) / 2) // 450, 150
      ctx.closePath()
      ctx.fillStyle = '#000' // 黒色
      ctx.fill()
      return
    }
    const newSize = size / 2
    drawSierpinski(x, y, newSize, depth - 1)
    drawSierpinski(x + newSize, y, newSize, depth - 1)
    drawSierpinski(
      x + newSize / 2,
      y - (newSize * Math.sqrt(3)) / 2,
      newSize,
      depth - 1
    )
  }

  // 初期の三角形を描画
  drawSierpinski(x, y, size, depth)
  postMessage(canvas.transferToImageBitmap())
}
