"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import { useUpdateTask } from "@/hooks/use-tasks";

export function useTaskMove() {
  const updateTask = useUpdateTask();

  const [target, setTarget] = useState<Task | null>(null);
  const [projectId, setProjectId] = useState("");

  function open(task: Task) {
    setTarget(task);
    setProjectId(task.projectId);
  }

  function close() {
    if (updateTask.isPending) return;
    setTarget(null);
  }

  function submit() {
    if (!target || !projectId) return;
    updateTask.mutate(
      { id: target.id, input: { projectId } },
      { onSuccess: () => setTarget(null) }
    );
  }

  return {
    target,
    isOpen: Boolean(target),
    projectId,
    onProjectIdChange: setProjectId,
    isSubmitting: updateTask.isPending,
    onOpenChange: (open: boolean) => {
      if (open) return;
      close();
    },
    open,
    submit,
  };
}

export type TaskMove = ReturnType<typeof useTaskMove>;