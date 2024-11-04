const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    this.form.onsubmit = (event) => {
      event.preventDefault();

      const li = document.createElement("li");
      li.style.listStyle = "none";
      const div = document.createElement("div");
      const destroy = document.createElement("input");
      destroy.type = "checkbox";
      const label = document.createElement("label");
      label.textContent = this.input.value;
      const button = document.createElement("button");

      destroy.onclick = (event) => {
        label.style.color = "#333";
        label.style.textDecoration = "line-through";
      };
      button.onclick = (event) => {
        li.remove();
      };

      button.textContent = "❌";

      div.appendChild(destroy);
      div.appendChild(label);
      div.appendChild(button);
      li.appendChild(div);
      this.list.appendChild(li);

      this.input.value = "";
    };
  }
}

customElements.define("todo-app", TodoApp);
