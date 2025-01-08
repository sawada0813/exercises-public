import net from "net";

const numOfClient = 10000;

for (let i = 1; i <= numOfClient; i++) {
  const client = net.createConnection(3000, "localhost", () => {
    console.log("connected: " + i);
  });
  client.on("data", (data) => {
    console.log(data.toString());
  });
}
