const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// const allowCorsOption = {
//   mode: "cors",
//   // credentials: "include",
// };

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch("http://localhost:3001/api/tasks", {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => response.json())
    // items を一つずつ appendToDoItem() で追加していく
    .then((json) => {
      json.items.forEach((element) => appendToDoItem(element));
    });
  // 問題文に従って alert する
  // .catch((e) => alert(e));
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // A. このインベントハンドラとは異なるSubmitインベントが走り、意図しないリロードなどが発生する
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ name: todo }),
  })
    .then((response) => response.json())
    .then((json) => {
      appendToDoItem(json);
    })
    .catch((e) => alert(e));
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
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", (e) => {
    e.preventDefault();

    // change イベントが通知される前の status が active かどうか
    let isActive = true;
    // toggleの状態をサーバーから取得する
    fetch("http://localhost:3001/api/tasks/" + task.id, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        isActive = json.status === "active";
      })
      // 更新する
      .then(() => {
        fetch("http://localhost:3001/api/tasks/" + task.id, {
          method: "PATCH",
          body: JSON.stringify({
            name: task.name,
            status: isActive ? "completed" : "active",
          }),
          mode: "cors",
          credentials: "include",
        }).then((e) => {
          label.style.textDecorationLine = isActive ? "line-through" : "none";
        });
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/tasks/" + task.id, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    }).then((e) => {
      elem.remove();
    });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
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
