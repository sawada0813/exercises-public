"use client";
import { useState, Dispatch, SetStateAction } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoProps = {
  item: Todo | null;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

function Todo({ item, setTodos }: TodoProps) {
  const handleCheckbox = () => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === item?.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  };
  const handleDelete = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== item?.id));
  };
  return (
    <>
      {item ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={handleCheckbox}
          />
          <label
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.text}
          </label>
          <button onClick={handleDelete}>❌</button>
        </div>
      ) : null}
    </>
  );
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    if (!input.value) return;
    const text = input.value;
    const item = { id: todos.length + 1, text, completed: false };
    setTodos([...todos, item]);
    input.value = "";
  };

  return (
    <>
      <title>Todo App</title>
      <form onSubmit={handleSubmit}>
        <input style={{ outline: "black" }} type="text" />
        <button>追加</button>
      </form>
      {todos.map((todo, key) => {
        return <Todo key={key} item={todo} setTodos={setTodos} />;
      })}
    </>
  );
}
