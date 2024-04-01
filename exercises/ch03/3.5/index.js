export function convertLFtoCRLF(text) {
  return text.replace(/\n/g, `\r\n`);
}

export function convertCRLFtoLF(text) {
  return text.replace(/\r\n/g, `\n`);
}
