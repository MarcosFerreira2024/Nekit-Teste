"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type {
  CreateProjectInput,
  Project,
  ProjectQuery,
  UpdateProjectInput,
} from "@/types/project";

export const PROJECTS_KEY = "projects";

export function useProjects(query: ProjectQuery) {
  return useQuery({
    queryKey: [PROJECTS_KEY, query],
    queryFn: () => api.get<Project[]>("/projects", query),
  });
}

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: [PROJECTS_KEY, id],
    queryFn: () => api.get<Project>(`/projects/${id}`),
    enabled: Boolean(id),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProjectInput) =>
      api.post<Project>("/projects", input),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success(`Projeto "${project.title}" criado com sucesso.`);
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateProjectInput;
    }) => api.patch<Project>(`/projects/${id}`, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success("Projeto atualizado com sucesso.");
      void variables;
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete<null>(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      toast.success("Projeto excluído com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}