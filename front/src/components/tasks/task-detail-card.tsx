"use client";

import {
  CalendarClockIcon,
  CheckCircle2Icon,
  CircleIcon,
  ClipboardIcon,
  DownloadIcon,
  ImageIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import type { Task } from "@/types/task";
import type { Capture } from "@/hooks/use-capture";
import { PRIORITY_LABELS, PRIORITY_VARIANTS } from "@/lib/task-presentation";
import { formatDate, formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type TaskDetailCardProps = {
  task: Task | null;
  projectTitle?: string | null;
  isLoading?: boolean;
  capture: Capture;
  onCopyText: () => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskDetailCard({
  task,
  projectTitle,
  isLoading = false,
  capture,
  onCopyText,
  onEdit,
  onToggleComplete,
  onDelete,
}: TaskDetailCardProps) {
  const {
    containerRef,
    isBusy,
    copyImage,
    downloadImage,
  } = capture;

  if (isLoading || !task) {
    return (
      <div className="grid gap-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div ref={containerRef} className="grid gap-4 rounded-xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={task.completed ? "secondary" : "outline"}
                className="gap-1"
              >
                {task.completed ? <CheckCircle2Icon /> : <CircleIcon />}
                {task.completed ? "Concluída" : "Pendente"}
              </Badge>
              <Badge variant={PRIORITY_VARIANTS[task.priority]}>
                Prioridade {PRIORITY_LABELS[task.priority]}
              </Badge>
            </div>
            <p className="max-w-prose font-heading text-xl font-semibold tracking-tight">
              {task.title}
            </p>
            {projectTitle && (
              <p className="text-sm text-muted-foreground">
                Projeto: {projectTitle}
              </p>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-3 rounded-xl bg-muted/50 p-4 text-sm sm:grid-cols-2">
          <div className="grid gap-0.5">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClockIcon className="size-3.5" />
              Data limite
            </dt>
            <dd className="font-medium">{formatDate(task.dueDate)}</dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClipboardIcon className="size-3.5" />
              Criada em
            </dt>
            <dd className="font-medium">{formatDateTime(task.createdAt)}</dd>
          </div>
        </dl>
      </div>

      <div
        data-capture-exclude
        className="flex flex-wrap items-center gap-2 border-t pt-4"
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

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onToggleComplete(task)}
          >
            {task.completed ? (
              <CircleIcon data-icon="inline-start" />
            ) : (
              <CheckCircle2Icon data-icon="inline-start" />
            )}
            {task.completed ? "Reabrir" : "Concluir"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
          >
            <PencilIcon data-icon="inline-start" />
            Editar
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task)}
          >
            <TrashIcon data-icon="inline-start" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TaskDetailDialog({
  task,
  projectTitle,
  open,
  onOpenChange,
  capture,
  onCopyText,
  onEdit,
  onToggleComplete,
  onDelete,
}: TaskDetailCardProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Detalhes da tarefa</DialogTitle>
          <DialogDescription>
            Card detalhado que pode ser copiado como imagem.
          </DialogDescription>
        </DialogHeader>
        <TaskDetailCard
          task={task}
          projectTitle={projectTitle}
          capture={capture}
          onCopyText={onCopyText}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
}