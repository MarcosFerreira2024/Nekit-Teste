"use client";

import { FolderOpenIcon } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectCardGridProps = {
  projects: Project[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export function ProjectCardGrid({
  projects,
  isLoading,
  isFetchingNextPage,
  onView,
  onEdit,
  onDelete,
}: ProjectCardGridProps) {
  if (isLoading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-52 w-full" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpenIcon}
        title="Nenhum projeto encontrado"
        description="Ajuste os filtros ou crie um novo projeto para começar."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="h-52 w-full" />
        ))}
    </div>
  );
}