"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TASK_PRIORITIES, type TaskPriority } from "@/types/task";
import {
  TASK_TITLE_MAX_LENGTH,
  type TaskFormErrors,
} from "@/hooks/use-task-form";
import {
  toProjectOptions,
  type ProjectOptions,
} from "@/hooks/use-project-options";

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  HIGH: "Alta",
  MEDIUM: "Média",
  LOW: "Baixa",
};

type TaskFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  projects: ProjectOptions;
  title: string;
  onTitleChange: (value: string) => void;
  priority: TaskPriority;
  onPriorityChange: (value: TaskPriority) => void;
  dueDate: string;
  onDueDateChange: (value: string) => void;
  projectId: string;
  onProjectIdChange: (value: string) => void;
  errors: TaskFormErrors;
  onSubmit: () => void;
};

export function TaskFormDialog({
  open,
  onOpenChange,
  isEditing,
  isSubmitting,
  projects,
  title,
  onTitleChange,
  priority,
  onPriorityChange,
  dueDate,
  onDueDateChange,
  projectId,
  onProjectIdChange,
  errors,
  onSubmit,
}: TaskFormDialogProps) {
  const projectOptions = toProjectOptions(projects);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar tarefa" : "Nova tarefa"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações da tarefa."
              : "Preencha os dados para criar uma nova tarefa."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="task-project">Projeto</Label>
            <Select value={projectId} onValueChange={onProjectIdChange}>
              <SelectTrigger
                id="task-project"
                className="w-full"
                aria-invalid={Boolean(errors.projectId)}
              >
                <SelectValue placeholder="Selecione o projeto" />
              </SelectTrigger>
              <SelectContent>
                {projectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectId && (
              <p className="text-xs text-destructive">{errors.projectId}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-title">Título</Label>
            <Input
              id="task-title"
              value={title}
              maxLength={TASK_TITLE_MAX_LENGTH}
              placeholder="Nome da tarefa"
              aria-invalid={Boolean(errors.title)}
              onChange={(event) => onTitleChange(event.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-priority">Prioridade</Label>
            <Select
              value={priority}
              onValueChange={(value) => onPriorityChange(value as TaskPriority)}
            >
              <SelectTrigger
                id="task-priority"
                className="w-full"
                aria-invalid={Boolean(errors.priority)}
              >
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                {TASK_PRIORITIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {PRIORITY_LABELS[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-xs text-destructive">{errors.priority}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-due-date">Data limite</Label>
            <Input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => onDueDateChange(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar tarefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}