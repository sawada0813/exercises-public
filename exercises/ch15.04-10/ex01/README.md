問題 1. 以下の HTML, JavaScript および CSS は ToDo アプリのソースコードです。CSS を変更して株式会社RICOHのようなデザインにしてください。

```html
<!doctype html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script type="module" src="/ch15.04-10/ex01/index.js"></script>
    <link rel="stylesheet" href="/ch15.04-10/ex01/style.css" />
  </head>
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
    li.classList.toggle("completed", toggle.checked);
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
```

```css
.completed {
  text-decoration: line-through;
}
```

以下、ChatGPTの回答

````
株式会社RICOHのデザインスタイルを反映させたToDoアプリのCSSを以下に示します。シンプルでクリーンなデザインを意識し、色合いやフォント、ボタンのスタイルを調整しました。

```css
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  color: #333;
  margin: 0;
  padding: 20px;
}

form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 300px;
  padding: 10px;
  border: 1px solid #0076a8;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #0076a8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #005f8c;
}

#todo-list {
  list-style: none;
  padding: 0;
}

#todo-list li {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle {
  margin-right: 10px;
}

label.content {
  flex-grow: 1;
}

/* 背景色は無色 */
button.destroy {
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-size: 20px;
}

.completed .content {
  text-decoration: line-through;
  color: #888;
}
````

デザインのポイント

1. **色合い**: RICOHのブランドカラーを意識し、メインカラーに青系を使用しました。
2. **フォント**: シンプルなサンセリフ体を使用して読みやすさを強調しました。
3. **ボタンスタイル**: クリック時の視覚的フィードバックを与えるために、ホバーエフェクトを追加しました。
4. **レイアウト**: フォームとリストを中央に配置し、余白を確保して見やすさを向上させました。

このCSSをアプリのスタイルシートに追加すれば、株式会社RICOHのようなデザインに近づけることができます。必要に応じて微調整してください。

問題 2. 1 で作成した CSS が何をしているか調査し、以下の例を参考に各セレクタ単位で最低 1 行のコメントを書きなさい。
調査の際はブラウザの開発者ツール (問題 15.4-10.3 参照) を使い、各 CSS をオン・オフするとどうなるか確認すると良い。

```css
/* フォントを指定して背景色を #f0f0f0 に設定、周囲 20px を padding していてmarginは 0 */
body {
  font-family: "Arial", sans-serif;
  background-color: #f0f0f0;
  color: #333;
  margin: 0;
  padding: 20px;
}

/* display と justify-content で左右中央に配置 */
form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* form の入力箇所の幅を 300px で固定して border-radius で 4px 分の角を丸くしている */
input[type="text"] {
  width: 300px;
  padding: 10px;
  border: 1px solid #0076a8;
  border-radius: 4px;
  font-size: 16px;
}

/* cursor の設定でホバーした時のカーソルが pointer （指）になっている */
button {
  background-color: #0076a8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
}

/* ボタンのホバー時の色 */
button:hover {
  background-color: #005f8c;
}

/* 箇条書きのようなリストにはせず、li要素は label の文字列のみを表示する */
#todo-list {
  list-style: none;
  padding: 0;
}

/* margin-bottom でリストの要素に間隔を設定して見やすくしている */
#todo-list li {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* トグルとラベルの間に 10px の間隔を設定 */
.toggle {
  margin-right: 10px;
}

/* flex box の大きさの比率を決めるものだが、検証ツールでこのスタイルを向こうにしてもデザインに影響がないように見えた */
label.content {
  flex-grow: 1;
}

/* cursor の設定でホバーした時のカーソルが pointer （指）になっている */
/* 背景色は無色 */
button.destroy {
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-size: 20px;
}

/* チェックボックスをチェック状態にするとこのスタイルが適用されて text-decoration によって取り消し線が引かれ、色が灰色になる */
.completed .content {
  text-decoration: line-through;
  color: #888;
}
```
