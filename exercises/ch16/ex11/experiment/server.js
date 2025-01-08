import net from "net";

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("connected");
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
