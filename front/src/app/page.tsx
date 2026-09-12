"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import type { Project } from "@/types/project";
import { useProjectInfinite } from "@/hooks/use-project-infinite";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useProjectForm } from "@/hooks/use-project-form";
import { useDeleteProject } from "@/hooks/use-projects";
import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { ProjectFilterBar } from "@/components/projects/project-filter-bar";
import { ProjectCardGrid } from "@/components/projects/project-card-grid";
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { ErrorBanner } from "@/components/common/error-banner";

export default function HomePage() {
  const router = useRouter();
  const projectForm = useProjectForm();
  const deleteProject = useDeleteProject();
  const infinite = useProjectInfinite();

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const sentinelRef = useInfiniteScroll({
    enabled: Boolean(infinite.hasNextPage),
    isLoading: infinite.isFetchingNextPage,
    onLoadMore: infinite.loadMore,
  });

  function handleView(project: Project) {
    router.push(`/projects/${project.id}`);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteProject.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <div className="grid gap-6">
      <ProjectPageHeader
        onCreateClick={() => projectForm.open()}
      />

      <ProjectFilterBar
        title={infinite.title}
        onTitleChange={infinite.onTitleChange}
        description={infinite.description}
        onDescriptionChange={infinite.onDescriptionChange}
        onReset={infinite.onReset}
      />

      {infinite.isError && (
        <ErrorBanner
          message={infinite.errorMessage}
          onRetry={infinite.refetch}
        />
      )}

      <ProjectCardGrid
        projects={infinite.projects}
        isLoading={infinite.isPending}
        isFetchingNextPage={infinite.isFetchingNextPage}
        onView={handleView}
        onEdit={(project) => projectForm.open(project)}
        onDelete={setDeleteTarget}
      />

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {infinite.isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <Loader2Icon className="size-4 animate-spin" />
          <span>Carregando mais projetos...</span>
        </div>
      )}

      {infinite.hasNextPage && !infinite.isFetchingNextPage && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Role para carregar mais projetos...
        </p>
      )}

      <ProjectFormDialog
        open={projectForm.isOpen}
        onOpenChange={projectForm.onOpenChange}
        isEditing={projectForm.isEditing}
        isSubmitting={projectForm.isSubmitting}
        title={projectForm.title}
        onTitleChange={projectForm.onTitleChange}
        description={projectForm.description}
        onDescriptionChange={projectForm.onDescriptionChange}
        errors={projectForm.errors}
        onSubmit={projectForm.handleSubmit}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Excluir projeto"
        description={`Tem certeza que deseja excluir o projeto "${deleteTarget?.title}" e todas as suas tarefas? Essa ação não pode ser desfeita.`}
        isSubmitting={deleteProject.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}