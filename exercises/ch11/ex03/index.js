const convertToBigEndian = (uint32Array) => {
  // uint32Arrayは1要素あたり4バイト
  const buffer = new ArrayBuffer(uint32Array.length * 4);
  const view = new DataView(buffer);

  console.log("convertToBigEndian");
  // 要素ごとに処理
  for (let i = 0; i < uint32Array.length; i++) {
    // リトルインディアンでset
    console.log(view);
    view.setUint32(i * 4, uint32Array[i], true);
    console.log(view);
    // リトルインディアンでget
    const value = view.getUint32(i * 4, true);
    // ビッグインディアンでset
    console.log(view);
    view.setUint32(i * 4, value, false);
    console.log(view);
  }
  return new Uint32Array(buffer);
};

const convertToLittleEndian = (uint32Array) => {
  // uint32Arrayは1要素あたり4バイト
  const buffer = new ArrayBuffer(uint32Array.length * 4);
  const view = new DataView(buffer);

  console.log("convertToLittleEndian");
  // 要素ごとに処理
  for (let i = 0; i < uint32Array.length; i++) {
    // ビッグインディアンでset
    console.log(view);
    view.setUint32(i * 4, uint32Array[i], false);
    console.log(view);
    // ビッグインディアンでget
    const value = view.getUint32(i * 4, false);
    // リトルインディアンでset
    console.log(view);
    view.setUint32(i * 4, value, true);
    console.log(view);
  }
  return new Uint32Array(buffer);
};

export { convertToBigEndian, convertToLittleEndian };
