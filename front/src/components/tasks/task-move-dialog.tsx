"use client";

import { FolderInputIcon } from "lucide-react";
import type { Task } from "@/types/task";
import type { ProjectOptions } from "@/hooks/use-project-options";
import { toProjectOptions } from "@/hooks/use-project-options";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TaskMoveDialogProps = {
  task: Task | null;
  projects: ProjectOptions;
  open: boolean;
  projectId: string;
  onProjectIdChange: (value: string) => void;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
};

export function TaskMoveDialog({
  task,
  projects,
  open,
  projectId,
  onProjectIdChange,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: TaskMoveDialogProps) {
  const options = toProjectOptions(projects);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mover tarefa</DialogTitle>
          <DialogDescription>
            Associe a tarefa {task?.title ? (
              <span className="font-medium">{task.title}</span>
            ) : (
              "selecionada"
            )}{" "}
            a outro projeto.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="task-move-project">Projeto</Label>
          <Select value={projectId} onValueChange={onProjectIdChange}>
            <SelectTrigger id="task-move-project" className="w-full">
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
            <FolderInputIcon data-icon="inline-start" />
            {isSubmitting ? "Movendo..." : "Mover"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}