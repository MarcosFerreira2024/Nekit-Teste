import type { TaskPriority } from "@/types/task";

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  HIGH: "Alta",
  MEDIUM: "Média",
  LOW: "Baixa",
};

export const PRIORITY_VARIANTS: Record<
  TaskPriority,
  "destructive" | "secondary" | "outline"
> = {
  HIGH: "destructive",
  MEDIUM: "secondary",
  LOW: "outline",
};