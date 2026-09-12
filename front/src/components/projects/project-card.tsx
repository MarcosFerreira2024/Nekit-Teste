"use client";

import type { KeyboardEvent } from "react";
import {
  CalendarClockIcon,
  FolderIcon,
  ListChecksIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TriangleAlertIcon,
  TrashIcon,
} from "lucide-react";
import type { Project } from "@/types/project";
import { getProjectCardStats } from "@/lib/project-stats";
import { formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProjectCardProps = {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const stats = getProjectCardStats(project);
  const progress = stats.total > 0 ? (stats.done / stats.total) * 100 : 0;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onView(project);
    }
  }

  return (
    <Card
      role="link"
      tabIndex={0}
      aria-label={`Abrir projeto ${project.title}`}
      className="cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:bg-muted/50"
      onClick={() => onView(project)}
      onKeyDown={handleKeyDown}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <FolderIcon />
            {stats.total} tarefas
          </Badge>
          {stats.overdue > 0 && (
            <Badge variant="destructive" className="gap-1">
              <TriangleAlertIcon />
              {stats.overdue} atrasadas
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription>
          {project.description || "Sem descrição."}
        </CardDescription>
        <CardAction onClick={(event) => event.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Ações">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(project)}>
                Abrir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <PencilIcon />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(project)}
              >
                <TrashIcon />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="grid gap-3">
        <div className="grid gap-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span>
              {stats.done}/{stats.total} concluídas
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ListChecksIcon className="size-3.5 text-muted-foreground" />
          <Badge variant="destructive">Alta {stats.byPriority.HIGH}</Badge>
          <Badge variant="secondary">Média {stats.byPriority.MEDIUM}</Badge>
          <Badge variant="outline">Baixa {stats.byPriority.LOW}</Badge>
        </div>
      </CardContent>

      <CardFooter className="gap-1.5 text-xs text-muted-foreground">
        <CalendarClockIcon className="size-3.5" />
        <span>Criado em {formatDateTime(project.createdAt)}</span>
      </CardFooter>
    </Card>
  );
}