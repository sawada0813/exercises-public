const convertToBigEndian = (uint32Array) => {
  // uint32Arrayは1要素あたり4バイト
  const buffer = new ArrayBuffer(uint32Array.length * 4);
  const view = new DataView(buffer);

  // 要素ごとに処理
  for (let i = 0; i < uint32Array.length; i++) {
    // リトルインディアンでset
    view.setUint32(i * 4, uint32Array[i], true);
    // リトルインディアンでget
    const value = view.getUint32(i * 4, true);
    // ビッグインディアンでset
    view.setUint32(i * 4, value, false);
  }
  return new Uint32Array(buffer);
};

const convertToLittleEndian = (uint32Array) => {
  // uint32Arrayは1要素あたり4バイト
  const buffer = new ArrayBuffer(uint32Array.length * 4);
  const view = new DataView(buffer);

  // 要素ごとに処理
  for (let i = 0; i < uint32Array.length; i++) {
    // ビッグインディアンでset
    view.setUint32(i * 4, uint32Array[i], false);
    // ビッグインディアンでget
    const value = view.getUint32(i * 4, false);
    // リトルインディアンでset
    view.setUint32(i * 4, value, true);
  }
  return new Uint32Array(buffer);
};

export { convertToBigEndian, convertToLittleEndian };
