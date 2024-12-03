const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// 書籍と同じ
function withDB(callback) {
  const request = indexedDB.open("tasks", 1);
  request.onerror = console.error;
  request.onsuccess = () => {
    const db = request.result;
    callback(db);
  };

  request.onupgradeneeded = () => {
    initdb(request.result, callback);
  };
}

// オブジェクトストアを作ってcallbackにdbを渡すだけ
function initdb(db, callback) {
  db.createObjectStore("tasks", { keyPath: "id" });
  callback(db);
}

document.addEventListener("DOMContentLoaded", async () => {
  withDB((db) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    transaction.onerror = console.error;
    const store = transaction.objectStore("tasks");
    store.getAll().onsuccess = (value) => {
      value.target.result.forEach((element) => {
        appendToDoItem(element);
      });
    };
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

  // dbに追加
  withDB((db) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    transaction.onerror = console.error;
    transaction.oncomplete = console.log;
    const store = transaction.objectStore("tasks");
    store.onerror = console.error;
    store.getAll().onsuccess = (value) => {
      store.add({
        id: value.target.result.length,
        name: todo,
        status: "active",
      });
      const liElements = document.querySelectorAll("li");
      liElements.forEach((li) => {
        li.remove();
      });
      // 描画するリストを最新に
      withDB((db) => {
        const transaction = db.transaction(["tasks"], "readwrite");
        transaction.oncomplete = console.log;
        const store = transaction.objectStore("tasks");
        store.getAll().onsuccess = (value) => {
          value.target.result.forEach((element) => {
            appendToDoItem(element);
          });
        };
      });
    };
  });
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

    withDB((db) => {
      const transaction = db.transaction(["tasks"], "readwrite");
      transaction.onerror = console.error;
      const store = transaction.objectStore("tasks");
      store.getAll().onsuccess = (value) => {
        const hoge = value.target.result.filter(
          (element) => element.id === task.id,
        )[0];
        label.style.textDecorationLine =
          hoge.status === "active" ? "line-through" : "none";
        store.put({
          id: hoge.id,
          name: hoge.name,
          status: hoge.status === "active" ? "completed" : "active",
        });
      };
    });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", (e) => {
    e.preventDefault();

    withDB((db) => {
      const transaction = db.transaction(["tasks"], "readwrite");
      transaction.onerror = console.error;
      const store = transaction.objectStore("tasks");
      store.getAll().onsuccess = (value) => {
        store.delete(task.id);
        const liElements = document.querySelectorAll("li");
        liElements.forEach((li) => {
          li.remove();
        });
        // 描画するリストを最新に
        withDB((db) => {
          const transaction = db.transaction(["tasks"], "readwrite");
          transaction.oncomplete = console.log;
          const store = transaction.objectStore("tasks");
          store.getAll().onsuccess = (value) => {
            value.target.result.forEach((element) => {
              appendToDoItem(element);
            });
          };
        });
      };
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
