// メッセージ仕様
// id: String
// message: String
// type: OUTWARD / RETURN

// WebSocketはグローバルで定義…

function sendRequest(message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("timeout");
    }, 30000);

    const ws = new WebSocket("ws://localhost:3003");
    const requestId = Math.random().toString(32).substring(2);

    ws.addEventListener("open", () => {
      const messageJson = JSON.stringify({
        id: requestId,
        message: message,
        type: "OUTWARD",
      });
      ws.send(messageJson);
    });

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "RETURN" && message.id === requestId) {
        clearTimeout(timer);
        resolve(message.message);
      }
    });

    ws.addEventListener("error", (event) => {
      reject(event);
    });
  });
}

// 他のクライアントにメッセージを返す用のWebSocketクライアントを作成
document.addEventListener("DOMContentLoaded", async () => {
  const ws = new WebSocket("ws://localhost:3003");

  ws.addEventListener("open", () => {
    console.log("connected");
  });

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    // 他のクライアントから送信されたメッセージを受け取って
    // prefixを付けて返す
    if (message.type === "OUTWARD") {
      ws.send(
        JSON.stringify({
          id: message.id,
          message: `Hello, ` + message.message,
          type: "RETURN",
        }),
      );
    }
  });

  ws.addEventListener("error", (event) => {
    reject(event);
  });
});

const form = document.querySelector("#message-send-form");

const input1 = document.querySelector("#message1");
const input2 = document.querySelector("#message2");
const input3 = document.querySelector("#message3");

const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");
const response3 = document.querySelector("#response3");

const submitEventCallback = (e) => {
  e.preventDefault();

  const todo1 = input1.value.trim();
  if (todo1 === "") {
    return;
  }
  const todo2 = input2.value.trim();
  if (todo1 === "") {
    return;
  }
  const todo3 = input3.value.trim();
  if (todo1 === "") {
    return;
  }

  sendRequest(todo1)
    .then((response) => {
      response1.textContent = response;
    })
    .catch((error) => {
      response1.textContent = error;
    });
  sendRequest(todo2)
    .then((response) => {
      response2.textContent = response;
    })
    .catch((error) => {
      response2.textContent = error;
    });
  sendRequest(todo3)
    .then((response) => {
      response3.textContent = response;
    })
    .catch((error) => {
      response3.textContent = error;
    });
};

form.addEventListener("submit", submitEventCallback);
