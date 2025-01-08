// curl http://localhost:11434/api/generate -d '{
//   "model": "gemma:2b",
//   "prompt":"こんにちは"
// }

const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelector("input");
// const inputText = document.querySelector('#inputText');
// const resonse = document.querySelector('#response');
const message = document.querySelector("#messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;
  input.value = "";

  const usersMessage = document.createElement("li");
  usersMessage.textContent = text;
  message.prepend(usersMessage);

  const llmMessage = document.createElement("li");
  const loadingText = document.createElement("li");
  loadingText.style.color = "blue";
  loadingText.textContent = "...";
  message.prepend(loadingText);

  fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: "gemma:2b",
      messages: [{ role: "user", content: text }],
      stream: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      llmMessage.style.color = "blue";
      llmMessage.textContent = data.message.content;
      // message.prepend(llmMessage);
      message.replaceChild(llmMessage, loadingText);
    });
});
