"use client";

import {
  CalendarClockIcon,
  CheckCircle2Icon,
  CircleIcon,
  ClipboardIcon,
  DownloadIcon,
  FolderIcon,
  ImageIcon,
} from "lucide-react";
import type { Project } from "@/types/project";
import type { Task } from "@/types/task";
import type { Capture } from "@/hooks/use-capture";
import { PRIORITY_LABELS, PRIORITY_VARIANTS } from "@/lib/task-presentation";
import { formatDate, formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectTasksSheetProps = {
  project: Project | null;
  tasks: Task[];
  isLoadingProject?: boolean;
  isLoadingTasks?: boolean;
  capture: Capture;
  onCopyText: () => void;
};

export function ProjectTasksSheet({
  project,
  tasks,
  isLoadingProject = false,
  isLoadingTasks = false,
  capture,
  onCopyText,
}: ProjectTasksSheetProps) {
  const { containerRef, isBusy, copyImage, downloadImage } = capture;

  return (
    <div className="grid gap-4">
      <div
        ref={containerRef}
        className="grid gap-5 rounded-xl bg-card p-6 ring-1 ring-foreground/10"
      >
        {isLoadingProject || !project ? (
          <div className="grid gap-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <FolderIcon />
                Projeto
              </Badge>
              <Badge variant="outline" className="gap-1">
                {tasks.length} tarefas
              </Badge>
            </div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {project.description || "Sem descrição."}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClockIcon className="size-3.5" />
              Criado em {formatDateTime(project.createdAt)}
            </p>
          </div>
        )}

        <div className="grid gap-2">
          {isLoadingTasks ? (
            <div className="grid gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <p className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
              Nenhuma tarefa para este projeto.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  {task.completed ? (
                    <CheckCircle2Icon className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <CircleIcon className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span
                    className={
                      task.completed
                        ? "truncate text-sm text-muted-foreground line-through"
                        : "truncate text-sm font-medium"
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={PRIORITY_VARIANTS[task.priority]}>
                    {PRIORITY_LABELS[task.priority]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        data-capture-exclude
        className="flex flex-wrap items-center gap-2"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCopyText}
          disabled={isBusy}
        >
          <ClipboardIcon data-icon="inline-start" />
          Copiar texto
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyImage}
          disabled={isBusy}
        >
          <ImageIcon data-icon="inline-start" />
          Copiar imagem
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={downloadImage}
          disabled={isBusy}
        >
          <DownloadIcon data-icon="inline-start" />
          Baixar PNG
        </Button>
      </div>
    </div>
  );
}