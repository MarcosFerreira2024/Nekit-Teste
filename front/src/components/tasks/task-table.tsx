"use client";

import {
  CheckCircle2Icon,
  CircleIcon,
  EyeIcon,
  FolderInputIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import type { Task } from "@/types/task";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRIORITY_LABELS, PRIORITY_VARIANTS } from "@/lib/task-presentation";
import { formatDate } from "@/lib/format";

type TaskTableProps = {
  tasks: Task[];
  isLoading: boolean;
  onToggleComplete: (task: Task) => void;
  onDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
  onMove: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskTable({
  tasks,
  isLoading,
  onToggleComplete,
  onDetails,
  onEdit,
  onMove,
  onDelete,
}: TaskTableProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2Icon}
        title="Nenhuma tarefa encontrada"
        description="Ajuste os filtros ou crie uma nova tarefa."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10" />
          <TableHead>Título</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Data limite</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} data-state={task.completed ? "completed" : undefined}>
            <TableCell>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task)}
                aria-label="Marcar como concluída"
              />
            </TableCell>
            <TableCell
              className={
                task.completed ? "text-muted-foreground line-through" : "font-medium"
              }
            >
              {task.title}
            </TableCell>
            <TableCell>
              <Badge variant={PRIORITY_VARIANTS[task.priority]}>
                {PRIORITY_LABELS[task.priority]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(task.dueDate)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Ações">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDetails(task)}>
                    <EyeIcon />
                    Detalhes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <PencilIcon />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onMove(task)}>
                    <FolderInputIcon />
                    Mover para projeto
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleComplete(task)}>
                    {task.completed ? (
                      <CircleIcon />
                    ) : (
                      <CheckCircle2Icon />
                    )}
                    {task.completed ? "Reabrir" : "Concluir"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => onDelete(task)}>
                    <TrashIcon />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}