"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { PROJECTS_KEY } from "@/hooks/use-projects";
import type {
  CreateTaskInput,
  Task,
  TaskFilters,
  UpdateTaskInput,
} from "@/types/task";

export const TASKS_KEY = "tasks";

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: [TASKS_KEY, filters],
    queryFn: () => api.get<Task[]>("/tasks", filters),
  });
}

export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: [TASKS_KEY, id],
    queryFn: () => api.get<Task>(`/tasks/${id}`),
    enabled: Boolean(id),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => api.post<Task>("/tasks", input),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success(`Tarefa "${task.title}" criada com sucesso.`);
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateTaskInput;
    }) => api.put<Task>(`/tasks/${id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success("Tarefa atualizada com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete<null>(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success("Tarefa excluída com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}