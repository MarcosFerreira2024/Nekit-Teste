"use client";

import { useMemo } from "react";
import type { Task, TaskPriority } from "@/types/task";
import { isOverdue, toDateKey } from "@/lib/task-date";

export type ProjectStats = {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: Record<TaskPriority, number>;
};

export function useProjectStats(tasks: Task[]): ProjectStats {
  return useMemo(() => {
    const today = toDateKey(new Date());
    const byPriority: Record<TaskPriority, number> = {
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    };

    let completed = 0;
    let overdue = 0;

    for (const task of tasks) {
      byPriority[task.priority] += 1;
      if (task.completed) completed += 1;
      else if (isOverdue(task, today)) overdue += 1;
    }

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      overdue,
      byPriority,
    };
  }, [tasks]);
}