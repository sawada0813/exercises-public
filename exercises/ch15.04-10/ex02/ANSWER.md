# 問題 1. [Tailwind CSS](https://tailwindcss.com/) がどういったフレームワークか調べなさい。

Tailwind CSSを利用することでHTML要素のクラス名にユーティリティクラスを指定することでスタイルを適用させることができ、CSS の複雑な設定などは不要となる。

Tailwind は、本番環境用にビルドするときに、未使用の CSS をすべて自動的に削除するため軽量である。また、複雑なメディアクエリを使うことなくレスポンシブなデザインを簡単に適用させることができる。

また、Tailwind には、専門家が作成したデフォルトのセットがすぐに使用できますが、カラーパレットから間隔スケール、ボックスの影、マウス カーソルまで、文字通りすべてをカスタマイズできる。

VS Code の Tailwind CSS IntelliSense 拡張機能と組み合わせて使うと便利である。

## 参考

- https://tailwindcss.com/

# 2. [ex02](ex02) の index.html および index.js を Tailwind CSS を使うように書き換えなさい。ChatGPT を使って [ex02/README](ex02) を参考に style.css を生成しなさい (HTML, JavaScript, CSS を解答として提出すること)。

````
以下の HTML および JavaScript は ToDo アプリのソースコードです。
Tailwind CSS を使う前提で HTML と JavaScript のコードを書き換えて見栄えを良くして下さい。
注意: HTML と JavaScript は1つのファイルにせず分けて出力して下さい。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script type="module" src="/ch15.04-10/ex02/index.js"></script>
    <!-- 以下の style.css は Tailwind CLI によって生成される -->
    <!-- html または js を変更した場合は README.md に従い Tailwind CLI を実行し style.css を再度生成すること -->
    <link rel="stylesheet" href="/ch15.04-10/ex02/style.css" />
  </head>
  <!-- IMPORTANT: ChatGPT にはここから下の内容しか変更させないこと -->
  <body>
    <form id="new-todo-form">
      <input type="text" id="new-todo" placeholder="What needs to be done?" />
      <button>Add</button>
    </form>
    <ul id="todo-list">
      <!-- NOTE: 以下のような要素を JavaScript で動的に追加する
      <li class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked />
          <label class="content">研修の予習範囲を読む</label>
          <button class="destroy"></button>
        </div>
      </li>
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content">研修の練習問題を完了する</label>
          <button class="destroy"></button>
        </div>
      </li>
      -->
    </ul>

    <template id="todo-template">
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content"></label>
          <button class="destroy">❌</button>
        </div>
      </li>
    </template>
  </body>
</html>

```

```js
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // IMPORTANT: ChatGPT にはこの関数内のコードのみ変更してもらうこと
    li.classList.toggle("completed", toggle.checked);
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});

```
````

以下、ChatGPTの回答

````html
以下は、ToDoアプリのHTMLとJavaScriptをTailwind
CSSを使用して見栄えを良くしたコードです。 ### HTML (index.html) ```html
<!doctype html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="/ch15.04-10/ex02/index.js"></script>
    <link rel="stylesheet" href="/ch15.04-10/ex02/style.css" />
  </head>
  <body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">ToDoアプリ</h1>
      <form id="new-todo-form" class="flex mb-4">
        <input
          type="text"
          id="new-todo"
          placeholder="何をする必要がありますか？"
          class="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600 transition"
        >
          追加
        </button>
      </form>
      <ul id="todo-list" class="list-none p-0">
        <!-- JavaScriptで動的に追加されるリストアイテム -->
      </ul>
      <template id="todo-template">
        <li class="mb-2">
          <div class="flex items-center bg-gray-50 p-2 rounded-lg shadow">
            <input class="toggle mr-2" type="checkbox" />
            <label class="content flex-1"></label>
            <button class="destroy text-red-500 hover:text-red-700 transition">
              ❌
            </button>
          </div>
        </li>
      </template>
    </div>
  </body>
</html>
````

### JavaScript (index.js)

```javascript
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    li.classList.toggle("completed", toggle.checked);
    label.classList.toggle("line-through", toggle.checked);
  });

  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
```

### 変更点

1. **HTML構造**:

   - 中心に配置されたカードスタイルのコンテナを作成。
   - 入力フォームとボタンのスタイルをTailwind CSSのクラスを使って見栄えを良くしました。

2. **CSSクラス**:

   - Tailwind CSSを使用して背景色、余白、フォントサイズ、ボタンのホバー効果などを追加しました。

3. **JavaScript**:
   - 完了したToDoアイテムに対して打消し線を適用するスタイルを追加しました。これにより、視覚的に完了状態が分かりやすくなります。

```

```
