import type { Task } from "@/types/task";

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isOverdue(task: Task, today: string): boolean {
  return Boolean(!task.completed && task.dueDate && task.dueDate < today);
}