"use client";

import { useState } from "react";
import { TASK_PRIORITIES, type Task, type TaskPriority } from "@/types/task";
import { useCreateTask, useUpdateTask } from "@/hooks/use-tasks";

export const TASK_TITLE_MAX_LENGTH = 60;

export type TaskFormErrors = {
  title?: string;
  priority?: string;
  projectId?: string;
};

export function useTaskForm(defaultProjectId?: string) {
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<Task | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId ?? "");
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const isEditing = Boolean(target);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function open(task?: Task) {
    setTarget(task);
    setTitle(task?.title ?? "");
    setPriority(task?.priority ?? "MEDIUM");
    setDueDate(task?.dueDate ?? "");
    setProjectId(task?.projectId ?? defaultProjectId ?? "");
    setErrors({});
    setIsOpen(true);
  }

  function close() {
    if (isSubmitting) return;
    setIsOpen(false);
  }

  function validate(): TaskFormErrors {
    const nextErrors: TaskFormErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Título é obrigatório.";
    } else if (title.length > TASK_TITLE_MAX_LENGTH) {
      nextErrors.title = `Título deve ter no máximo ${TASK_TITLE_MAX_LENGTH} caracteres.`;
    }

    if (!TASK_PRIORITIES.includes(priority)) {
      nextErrors.priority = "Prioridade inválida.";
    }

    if (!projectId.trim()) {
      nextErrors.projectId = "Selecione o projeto.";
    }

    return nextErrors;
  }

  function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing && target) {
      updateMutation.mutate(
        {
          id: target.id,
          input: {
            projectId,
            title: title.trim(),
            priority,
            dueDate: dueDate || null,
          },
        },
        { onSuccess: () => setIsOpen(false) }
      );
      return;
    }

    createMutation.mutate(
      {
        projectId,
        title: title.trim(),
        priority,
        dueDate: dueDate || null,
      },
      { onSuccess: () => setIsOpen(false) }
    );
  }

  return {
    isOpen,
    onOpenChange: (open: boolean) => {
      if (open) return;
      close();
    },
    isEditing,
    isSubmitting,
    open,
    close,
    title,
    onTitleChange: setTitle,
    priority,
    onPriorityChange: setPriority,
    dueDate,
    onDueDateChange: setDueDate,
    projectId,
    onProjectIdChange: setProjectId,
    errors,
    handleSubmit,
  };
}

export type TaskForm = ReturnType<typeof useTaskForm>;