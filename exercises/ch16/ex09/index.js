import express from "express";
import fs from "fs";
import path from "path";
import url from "url";

// /test/mirror の場合はリクエストをそのままレスポンスにして返す
// それ以外の場合はリクエストの内容をレスポンスにして返す

const fileType = (filename) => {
  switch (path.extname(filename)) {
    case ".html":
      return "text/html";
    case ".htm":
      return "text/html";
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".txt":
      return "text/plain";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};

const app = express();

const rootPath = "ch16/ex09";
app.use(express.static(rootPath, { index: false }));

app.get("/test/mirror", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  res.statusCode = 200;
  res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);

  const headers = req.rawHeaders;
  for (let i = 0; i < headers.length; i += 2) {
    res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
  }

  res.write("\r\n");
  req.pipe(res);
});

app.get("*", (req, res) => {
  const endpoint = url.parse(req.url).pathname;
  let filename = endpoint.substring(1);
  filename = filename.replace(/\.\.\//g, "");
  filename = path.resolve(rootPath, filename);

  const stream = fs.createReadStream(filename);
  stream.once("readable", () => {
    res.setHeader("Content-Type", fileType(filename));
    res.statusCode = 200;
    stream.pipe(res);
  });

  stream.on("error", (err) => {
    res.statusCode = 404;
    res.end(err.message);
  });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

export default app;
