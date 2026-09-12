"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import type { TaskPriority } from "@/types/task";
import type { TaskStatusFilter } from "@/components/tasks/task-filter-bar";

export const TASKS_PAGE_SIZE = 20;

export function useTaskFilters(projectId?: string) {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [completed, setCompleted] = useState<TaskStatusFilter>("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [dueDate, setDueDate] = useState("");
  const [overdue, setOverdue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [title]);

  const filters = {
    projectId,
    page,
    size: TASKS_PAGE_SIZE,
    title: debouncedTitle || undefined,
    completed: completed === "" ? undefined : completed === "true",
    priority: priority || undefined,
    dueDate: dueDate || undefined,
    overdue: overdue || undefined,
  };

  const { data, isPending, isError, error, refetch } = useTasks(filters);
  const hasNext = (data?.length ?? 0) === TASKS_PAGE_SIZE;
  const errorMessage = error instanceof Error ? error.message : "";

  function handleCompletedChange(value: TaskStatusFilter) {
    setCompleted(value);
    setPage(1);
  }

  function handlePriorityChange(value: TaskPriority | "") {
    setPriority(value);
    setPage(1);
  }

  function handleDueDateChange(value: string) {
    setDueDate(value);
    if (value !== "") {
      setOverdue(false);
    }
    setPage(1);
  }

  function handleOverdueChange(value: boolean) {
    setOverdue(value);
    if (value) {
      setDueDate("");
    }
    setPage(1);
  }

  function reset() {
    setTitle("");
    setCompleted("");
    setPriority("");
    setDueDate("");
    setOverdue(false);
    setPage(1);
  }

  return {
    title,
    onTitleChange: setTitle,
    completed,
    onCompletedChange: handleCompletedChange,
    priority,
    onPriorityChange: handlePriorityChange,
    dueDate,
    onDueDateChange: handleDueDateChange,
    overdue,
    onOverdueChange: handleOverdueChange,
    onReset: reset,
    page,
    onPageChange: setPage,
    hasNext,
    tasks: data ?? [],
    isPending,
    isError,
    errorMessage,
    refetch,
  };
}

export type TaskFiltersState = ReturnType<typeof useTaskFilters>;