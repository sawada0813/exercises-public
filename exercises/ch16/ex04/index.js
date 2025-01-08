import iconv from "iconv-lite";
import fs from "fs";

const source = fs.createReadStream("hello.txt");
const shiftJIS = iconv.decodeStream("shift_jis");

source.pipe(shiftJIS).pipe(process.stdout);
