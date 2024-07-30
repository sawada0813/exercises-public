function areEqualArray(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

export const detectFileType = (buffer) => {
  // PDF: 25 50 44 46 2D
  // ZIP: 50 4B 03 04
  // ZIP: 50 4B 05 06
  // ZIP: 50 4B 07 08
  // GIF: 47 49 46 38 37 61
  // GIF: 47 49 46 38 39 61
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    areEqualArray(
      new Uint8Array(buffer.slice(0, 5)),
      new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]),
    )
  ) {
    return "PDF";
  } else if (
    areEqualArray(
      new Uint8Array(buffer.slice(0, 4)),
      new Uint8Array([0x50, 0x4b, 0x03, 0x04]),
    ) ||
    areEqualArray(
      new Uint8Array(buffer.slice(0, 4)),
      new Uint8Array([0x50, 0x4b, 0x05, 0x06]),
    ) ||
    areEqualArray(
      new Uint8Array(buffer.slice(0, 4)),
      new Uint8Array([0x50, 0x4b, 0x07, 0x08]),
    )
  ) {
    return "ZIP";
  } else if (
    areEqualArray(
      new Uint8Array(buffer.slice(0, 6)),
      new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]),
    ) ||
    areEqualArray(
      new Uint8Array(buffer.slice(0, 6)),
      new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]),
    )
  ) {
    return "GIF";
  } else if (
    areEqualArray(
      new Uint8Array(buffer.slice(0, 8)),
      new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return "PNG";
  } else return "UNKNOWN";
};
