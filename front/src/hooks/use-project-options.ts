"use client";

import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/types/project";

export const PROJECT_OPTIONS_SIZE = 50;

export function useProjectOptions() {
  const { data } = useProjects({ page: 1, size: PROJECT_OPTIONS_SIZE });
  return data ?? [];
}

export type ProjectOptions = ReturnType<typeof useProjectOptions>;

export function toProjectOptions(projects: Project[]) {
  return projects.map((project) => ({
    value: project.id,
    label: project.title,
  }));
}