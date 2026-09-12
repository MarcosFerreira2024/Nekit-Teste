export const TASK_PRIORITIES = ["HIGH", "MEDIUM", "LOW"] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  projectId: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
};

export type CreateTaskInput = {
  projectId: string;
  title: string;
  priority: TaskPriority;
  dueDate?: string | null;
};

export type UpdateTaskInput = {
  projectId?: string;
  title?: string;
  priority?: TaskPriority;
  completed?: boolean;
  dueDate?: string | null;
};

export type TaskFilters = {
  projectId?: string;
  completed?: boolean;
  priority?: TaskPriority | "";
  title?: string;
  overdue?: boolean;
  dueDate?: string;
  page: number;
  size: number;
};