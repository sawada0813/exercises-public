// @flow
// 以下の型を定義すること
//  - User: { id: number, name: string }
type User = { id: number, name: string };
//  - Task: { title: string, completed: boolean, user: User }
type Task = { title: string, completed: boolean, user: User };
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
type Priority = "low" | "middle" | "high";
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する
function isUserObject(obj: any): boolean {
  return (
    typeof obj === "object" &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

export class TaskManager {
  _tasks: PriorityTask[] = [];

  // タスクを追加する
  add(task: PriorityTask) {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
  // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
  completeTask(target: User | string) {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // 引数を省略した場合はすべてのタスクを返す
  // tsとの差分
  getTasks(
    // predicate: ?(task: PriorityTask) => boolean
    predicate: ((task: PriorityTask) => boolean) | void,
  ): PriorityTask[] {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not(
  f: (args: PriorityTask) => {},
): (arg: PriorityTask) => boolean {
  return (arg: PriorityTask) => !f(arg);
}

// flow check ex09/task.flow.js
