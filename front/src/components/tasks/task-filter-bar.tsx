"use client";

import {
  RotateCcwIcon,
  SearchIcon,
} from "lucide-react";
import type { TaskPriority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskStatusFilter = "" | "true" | "false";

type TaskFilterBarProps = {
  title: string;
  onTitleChange: (value: string) => void;
  completed: TaskStatusFilter;
  onCompletedChange: (value: TaskStatusFilter) => void;
  priority: TaskPriority | "";
  onPriorityChange: (value: TaskPriority | "") => void;
  dueDate: string;
  onDueDateChange: (value: string) => void;
  overdue: boolean;
  onOverdueChange: (value: boolean) => void;
  onReset: () => void;
  taskCount: number;
};

export function TaskFilterBar({
  title,
  onTitleChange,
  completed,
  onCompletedChange,
  priority,
  onPriorityChange,
  dueDate,
  onDueDateChange,
  overdue,
  onOverdueChange,
  onReset,
  taskCount,
}: TaskFilterBarProps) {
  const hasActiveFilters =
    title.trim() !== "" ||
    completed !== "" ||
    priority !== "" ||
    dueDate !== "" ||
    overdue;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Buscar por título..."
          className="w-48 pl-8"
          aria-label="Buscar tarefas por título"
        />
      </div>

      <Select value={completed} onValueChange={onCompletedChange}>
        <SelectTrigger className="min-w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos</SelectItem>
          <SelectItem value="false">Pendentes</SelectItem>
          <SelectItem value="true">Concluídas</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="min-w-32">
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas</SelectItem>
          <SelectItem value="HIGH">Alta</SelectItem>
          <SelectItem value="MEDIUM">Média</SelectItem>
          <SelectItem value="LOW">Baixa</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={dueDate}
        disabled={overdue}
        onChange={(event) => onDueDateChange(event.target.value)}
        className="w-fit"
        aria-label="Data limite"
      />

      <Button
        type="button"
        variant={overdue ? "secondary" : "outline"}
        size="default"
        disabled={dueDate !== ""}
        onClick={() => onOverdueChange(!overdue)}
      >
        Atrasadas
      </Button>

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={onReset}
        >
          <RotateCcwIcon data-icon="inline-start" />
          Limpar filtros
        </Button>
      )}

      <span className="ml-auto text-sm text-muted-foreground">
        {taskCount} tarefa{taskCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}