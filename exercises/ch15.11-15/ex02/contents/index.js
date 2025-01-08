const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

async function retryFetchWithExponentialBackoff(url, options) {
  const maxRetry = 5;
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), 3000);

  async function retry(retryCount) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timerId);
      if (response.ok) {
        return response;
      } else {
        if (retryCount < maxRetry) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000),
          );
          return retry(retryCount + 1);
        } else {
          throw new Error("Failed to fetch data");
        }
      }
    } catch (e) {
      clearTimeout(timerId);
      if (retryCount < maxRetry) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryCount) * 1000),
        );
        return retry(retryCount + 1);
      } else {
        throw new Error("Failed to fetch data");
      }
    }
  }
  return await retry(0);
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  retryFetchWithExponentialBackoff("/api/tasks", {})
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.items.forEach((element) => appendToDoItem(element));
    })
    .catch((e) => {
      alert(e);
    });
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
  fetch("/api/tasks", { method: "POST", body: JSON.stringify({ name: todo }) })
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
    retryFetchWithExponentialBackoff("/api/tasks/" + task.id)
      .then((response) => response.json())
      .then((json) => {
        isActive = json.status === "active";
        return;
      })
      // 更新する
      .then(() => {
        retryFetchWithExponentialBackoff("/api/tasks/" + task.id, {
          method: "PATCH",
          body: JSON.stringify({
            name: task.name,
            status: isActive ? "completed" : "active",
          }),
        })
          .then((response) => response.json())
          .then((e) => {
            label.style.textDecorationLine =
              e.status === "completed" ? "line-through" : "none";
            return;
          })
          .catch((e) => {
            alert(e);
            toggle.checked = !toggle.checked;
          });
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", (e) => {
    e.preventDefault();

    retryFetchWithExponentialBackoff("/api/tasks/" + task.id, {
      method: "DELETE",
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
