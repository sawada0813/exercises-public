const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  const initItems = window.sessionStorage;
  const keys = Object.keys(initItems);
  console.log(keys);
  keys.map((key) => {
    appendToDoItem({ id: key, ...JSON.parse(sessionStorage.getItem(key)) });
  });
});

window.addEventListener("storage", (e) => {
  if (e.oldValue === null) {
    // 新規追加イベント
    appendToDoItem({ id: e.key, ...JSON.parse(e.newValue) });
    return;
  } else {
    if (e.newValue === null) {
      // 削除イベント
      const liElements = document.querySelectorAll("li");
      liElements.forEach((li) => {
        if (li.children[1].textContent === JSON.parse(e.oldValue).name) {
          li.remove();
        }
      });
    } else {
      // 更新イベント
      const liElements = document.querySelectorAll("li");
      liElements.forEach((li) => {
        if (li.children[1].textContent === JSON.parse(e.newValue).name) {
          li.children[0].checked =
            JSON.parse(e.newValue).status === "completed";
          li.children[1].style.textDecorationLine =
            JSON.parse(e.newValue).status === "completed"
              ? "line-through"
              : "none";
        }
      });
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // setItem(keyName, keyValue)
  appendToDoItem({
    id: window.sessionStorage.length,
    name: todo,
    status: "active",
  });
  window.sessionStorage.setItem(
    window.sessionStorage.length,
    JSON.stringify({ name: todo, status: "active" }),
  );
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "active" ? "none" : "line-through";

  const toggle = document.createElement("input");
  toggle.addEventListener("change", (e) => {
    e.preventDefault();

    const item = JSON.parse(window.sessionStorage.getItem(task.id));
    if (item.status === "completed") {
      item.status = "active";
      label.style.textDecorationLine = "none";
    } else {
      item.status = "completed";
      label.style.textDecorationLine = "line-through";
    }
    window.sessionStorage.setItem(task.id, JSON.stringify(item));
  });

  const destroy = document.createElement("button");
  destroy.addEventListener("click", (e) => {
    e.preventDefault();

    window.sessionStorage.removeItem(task.id);
    elem.remove();
  });
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  destroy.type = "button";
  destroy.textContent = "❌";

  // 最後にまとめて appendChild
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
