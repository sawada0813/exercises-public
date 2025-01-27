import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

function serve(rootDirectory, port) {
  const server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  server.on("request", (request, response) => {
    const endpoint = url.parse(request.url).pathname;

    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");

      response.writeHeader(200);

      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`,
      );

      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }

      response.write("\r\n");

      request.pipe(response);
    } else {
      if (request.method === "GET") {
        let filename = endpoint.substring(1);
        filename = filename.replace(/\.\.\//g, "");
        filename = path.resolve(rootDirectory, filename);

        let type;
        switch (path.extname(filename)) {
          case ".html":
            type = "text/html";
            break;
          case ".htm":
            type = "text/html";
            break;
          case ".js":
            type = "text/javascript";
            break;
          case ".css":
            type = "text/css";
            break;
          case ".png":
            type = "image/png";
            break;
          case ".txt":
            type = "text/plain";
            break;
          default:
            type = "application/octet-stream";
            break;
        }

        // const stream = fs.createReadStream(filename)
        // stream.once('readable', () => {
        //   response.setHeader('Content-Type', type)
        //   response.writeHeader(200)
        //   stream.pipe(response)
        // })

        // stream.on('error', (error) => {
        //   response.setHeader('Content-Type', 'text/plain; charset=UTF-8')
        //   response.writeHeader(404)
        //   response.end(error.message)
        // })

        try {
          const stream = fs.createReadStream(filename)
          response.setHeader("Content-Type", type);
          response.writeHeader(200);
          stream.pipe(response)
        } catch (error) {
          response.setHeader("Content-Type", "text/plain; charset=UTF-8");
          response.writeHeader(404);
          response.end(error.message);
        }
      } else if (request.method === "PUT") {
        let filename = endpoint.substring(1);
        filename = filename.replace(/\.\.\//g, "");
        filename = path.resolve(rootDirectory, filename);

        const stream = fs.createWriteStream(filename);
        request.pipe(stream);
        request.on("end", () => {
          response.writeHeader(200);
          response.end();
        });
      }
    }
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);

// コマンド例
// curl -X PUT -H "Content-Type: text/plain" --data-binary @ch16/ex10/test.txt localhost:8000/test2.txt
// curl localhost:8000/test.txt

// fetch('http://localhost:8000/test2.mov', {
//   method: 'PUT',
//   body: fs.createReadStream('ch16/ex10/sample2.mov'),
//   duplex: 'half',
// })

// fetch('http://localhost:8000/test2.mov', {
//   method: 'PUT',
//   body: fs.readFileSync('ch16/ex10/sample2.mov'),
//   duplex: 'half',
// })

// TODO: メモリ消費量の調査
// MacOSのためアクティビティモニタで確認した
// 1.81GB の動画ファイルで検証したところメモリの消費量は次のようになった
// fs.createReadStream: 1.82GB(node)
// fs.readFileSync: 5.21GB(node)
