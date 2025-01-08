import fs from "fs";

fs.truncate("test.txt", 512, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File truncated");
});
