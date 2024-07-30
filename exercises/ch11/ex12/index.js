export class SizeOverError extends Error {
  constructor(path, size) {
    super(
      `${path} is larger than allowed. Up to 500kByte is acceptable, that file seems to be ${size} bytes.`,
    );
    // サイズ[bytes]
    this.size = size;
    // ファイルのパス
    this.path = path;
  }

  get name() {
    return "SizeOverError";
  }
}

const error = new SizeOverError("file://hoge/bigSizeFile.webm", 999);
console.log(error.message);
console.log(error.name);
console.log(error.size);

// file://hoge/bigSizeFile.webm is larger than allowed. Up to 500kByte is acceptable, that file seems to be 999 bytes.
// SizeOverError
// 999
