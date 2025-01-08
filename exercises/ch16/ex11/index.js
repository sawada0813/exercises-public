import net from "net";
import fs from "fs";
import JSDOM from "jsdom";
import querystring from "querystring";

const isInvalidMethod = (method) => !["GET", "POST"].includes(method);
const isInvalidPath = (path) => !["/", "/greeting"].includes(path);

const writeNotFound = (socket) => {
  socket.write("HTTP/1.1 404 Not Found\r\n");
  socket.write("Content-Type: text/plain\r\n");
  socket.write("\r\n");
  socket.write("Not Found");
};

const extractNameAndGreeting = (data) => {
  const dataList = data.toString().split("\r\n");
  let inputName = "";
  let inputGreeting = "";

  dataList.forEach((item) => {
    if (item.includes("name")) {
      inputName = querystring.parse(item).name;
      inputGreeting = querystring.parse(item).greeting;
    }
  });

  return { inputName, inputGreeting };
};

const appendText = (text, document) => {
  const element = document.createElement("p");
  element.setAttribute("type", "text");
  element.textContent = text;
  document.body.appendChild(element);
};

const writeOKHeader = (socket) => {
  socket.write("HTTP/1.1 200 OK\r\n");
  socket.write("Content-Type: text/html\r\n");
  socket.write("\r\n");
};

const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    const method = data.toString().split("\r\n")[0].split(" ")[0];
    const path = data.toString().split("\r\n")[0].split(" ")[1];

    // 無効なメソッドとパスの場合は404を返す
    if (isInvalidMethod(method) || isInvalidPath(path)) {
      writeNotFound(socket);
      socket.end();
    } else if (method === "GET") {
      const stream = fs.createReadStream("ch16/ex11/index.html");
      stream.once("readable", () => {
        writeOKHeader(socket);
        stream.pipe(socket);
      });
    } else if (method === "POST") {
      const { inputName, inputGreeting } = extractNameAndGreeting(data);

      const stream = fs.createReadStream("ch16/ex11/index.html");
      let htmlData = "";
      stream.on("data", (chunk) => {
        htmlData += chunk;
      });
      stream.on("end", () => {
        const dom = new JSDOM.JSDOM(htmlData);
        const document = dom.window.document;

        appendText(inputName, document);
        appendText(inputGreeting, document);

        writeOKHeader(socket);
        socket.write(dom.serialize());
        socket.end();
      });
    }
  });
});

server.on("data", (socket) => {
  console.log(socket);
});

server.listen(3000, () => console.log("Server started on port 3000"));
