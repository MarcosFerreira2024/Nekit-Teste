"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { useProject } from "@/hooks/use-projects";
import { useProjectForm } from "@/hooks/use-project-form";
import { useTaskFilters } from "@/hooks/use-task-filters";
import { useTaskForm } from "@/hooks/use-task-form";
import { useTaskMove } from "@/hooks/use-task-move";
import { useProjectOptions } from "@/hooks/use-project-options";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { useProjectStats } from "@/hooks/use-project-stats";
import { useCapture } from "@/hooks/use-capture";
import { taskToText, projectTasksToText } from "@/lib/capture-text";
import { ProjectDetailCard } from "@/components/projects/project-detail-card";
import { ProjectTasksSheet } from "@/components/projects/project-tasks-sheet";
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { TaskFilterBar } from "@/components/tasks/task-filter-bar";
import { TaskTable } from "@/components/tasks/task-table";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { TaskMoveDialog } from "@/components/tasks/task-move-dialog";
import { TaskDetailDialog } from "@/components/tasks/task-detail-card";
import { Pagination } from "@/components/common/pagination";
import { ConfirmDeleteDialog } from "@/components/common/confirm-delete-dialog";
import { ErrorBanner } from "@/components/common/error-banner";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const projectQuery = useProject(id);
  const projects = useProjectOptions();
  const projectForm = useProjectForm();
  const taskFilters = useTaskFilters(id);
  const taskForm = useTaskForm(id);
  const taskMove = useTaskMove();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const stats = useProjectStats(taskFilters.tasks);

  const taskCapture = useCapture({
    fileNamePrefix: "tarefa",
    formatText: () =>
      detailsTask
        ? taskToText(detailsTask, projectQuery.data?.title ?? null)
        : "",
  });
  const tasksSheetCapture = useCapture({
    fileNamePrefix: projectQuery.data?.title ?? "projeto-tarefas",
    formatText: () =>
      projectQuery.data
        ? projectTasksToText(projectQuery.data, taskFilters.tasks)
        : "",
  });

  const [detailsTask, setDetailsTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  function handleToggleComplete(task: Task) {
    updateTask.mutate({ id: task.id, input: { completed: !task.completed } });
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteTask.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <div className="grid gap-6">
      <ProjectDetailCard
        isLoading={projectQuery.isPending}
        project={projectQuery.data ?? null}
        stats={stats}
        onBack={() => router.back()}
        onEdit={() => projectForm.open(projectQuery.data)}
        onCreateTask={() => taskForm.open()}
      />

      {projectQuery.isError && (
        <ErrorBanner
          message={projectQuery.error.message}
          onRetry={projectQuery.refetch}
        />
      )}

      <section className="grid gap-4">
        <h2 className="font-heading text-lg font-medium tracking-tight">
          Tarefas
        </h2>

        <TaskFilterBar
          title={taskFilters.title}
          onTitleChange={taskFilters.onTitleChange}
          completed={taskFilters.completed}
          onCompletedChange={taskFilters.onCompletedChange}
          priority={taskFilters.priority}
          onPriorityChange={taskFilters.onPriorityChange}
          dueDate={taskFilters.dueDate}
          onDueDateChange={taskFilters.onDueDateChange}
          overdue={taskFilters.overdue}
          onOverdueChange={taskFilters.onOverdueChange}
          onReset={taskFilters.onReset}
          taskCount={taskFilters.tasks.length}
        />

        {taskFilters.isError && (
          <ErrorBanner
            message={taskFilters.errorMessage}
            onRetry={taskFilters.refetch}
          />
        )}

        <TaskTable
          tasks={taskFilters.tasks}
          isLoading={taskFilters.isPending}
          onToggleComplete={handleToggleComplete}
          onDetails={setDetailsTask}
          onEdit={(task) => taskForm.open(task)}
          onMove={(task) => taskMove.open(task)}
          onDelete={setDeleteTarget}
        />

        <Pagination
          page={taskFilters.page}
          hasNext={taskFilters.hasNext}
          onPageChange={taskFilters.onPageChange}
        />
      </section>

      <section className="grid gap-4 border-t pt-6">
        <h2 className="font-heading text-lg font-medium tracking-tight">
          Baixar / copiar projeto e tarefas
        </h2>

        <ProjectTasksSheet
          project={projectQuery.data ?? null}
          tasks={taskFilters.tasks}
          isLoadingProject={projectQuery.isPending}
          isLoadingTasks={taskFilters.isPending}
          capture={tasksSheetCapture}
          onCopyText={tasksSheetCapture.copyText}
        />
      </section>

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

      <TaskFormDialog
        open={taskForm.isOpen}
        onOpenChange={taskForm.onOpenChange}
        isEditing={taskForm.isEditing}
        isSubmitting={taskForm.isSubmitting}
        projects={projects}
        title={taskForm.title}
        onTitleChange={taskForm.onTitleChange}
        priority={taskForm.priority}
        onPriorityChange={taskForm.onPriorityChange}
        dueDate={taskForm.dueDate}
        onDueDateChange={taskForm.onDueDateChange}
        projectId={taskForm.projectId}
        onProjectIdChange={taskForm.onProjectIdChange}
        errors={taskForm.errors}
        onSubmit={taskForm.handleSubmit}
      />

      <TaskMoveDialog
        task={taskMove.target}
        projects={projects}
        open={taskMove.isOpen}
        projectId={taskMove.projectId}
        onProjectIdChange={taskMove.onProjectIdChange}
        isSubmitting={taskMove.isSubmitting}
        onOpenChange={taskMove.onOpenChange}
        onSubmit={taskMove.submit}
      />

      <TaskDetailDialog
        open={Boolean(detailsTask)}
        onOpenChange={(open) => {
          if (!open) setDetailsTask(null);
        }}
        task={detailsTask}
        projectTitle={projectQuery.data?.title ?? null}
        capture={taskCapture}
        onCopyText={taskCapture.copyText}
        onEdit={(task) => {
          setDetailsTask(null);
          taskForm.open(task);
        }}
        onToggleComplete={handleToggleComplete}
        onDelete={(task) => {
          setDetailsTask(null);
          setDeleteTarget(task);
        }}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Excluir tarefa"
        description={`Tem certeza que deseja excluir a tarefa "${deleteTarget?.title}"? Essa ação não pode ser desfeita.`}
        isSubmitting={deleteTask.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}