import type { Project } from "@/types/project";
import type { TaskPriority } from "@/types/task";
import { isOverdue, toDateKey } from "@/lib/task-date";

export type ProjectCardStats = {
  total: number;
  done: number;
  pending: number;
  overdue: number;
  byPriority: Record<TaskPriority, number>;
};

export function getProjectCardStats(project: Project): ProjectCardStats {
  const tasks = project.tasks ?? [];
  const today = toDateKey(new Date());
  const byPriority: Record<TaskPriority, number> = {
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
  };

  let done = 0;
  let overdue = 0;

  for (const task of tasks) {
    byPriority[task.priority] += 1;
    if (task.completed) done += 1;
    else if (isOverdue(task, today)) overdue += 1;
  }

  return {
    total: tasks.length,
    done,
    pending: tasks.length - done,
    overdue,
    byPriority,
  };
}