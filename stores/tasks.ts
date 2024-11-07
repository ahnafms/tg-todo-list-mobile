import { Task } from "@/entities/task/task.types";
import { atom } from "jotai";

export const tasksAtom = atom<Task[]>([]);

export const updateTasksAtom = atom(null, (get, set, task: Task) => {
  const tasks = get(tasksAtom);

  const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));

  set(tasksAtom, updatedTasks);
});

export const deleteTasksAtom = atom(null, (get, set, id: Task["id"]) => {
  const tasks = get(tasksAtom);
  const filteredTask = tasks.filter((t) => t.id != id);
  set(tasksAtom, filteredTask);
});
