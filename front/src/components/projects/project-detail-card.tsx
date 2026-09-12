"use client";

import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  ClockIcon,
  FolderIcon,
  ListChecksIcon,
  PencilIcon,
  PlusIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type { Project } from "@/types/project";
import type { ProjectStats } from "@/hooks/use-project-stats";
import { formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectDetailCardProps = {
  isLoading?: boolean;
  project: Project | null;
  stats: ProjectStats;
  onBack: () => void;
  onEdit: () => void;
  onCreateTask: () => void;
};

function StatItem({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone?: "default" | "success" | "danger";
}) {
  return (
    <div className="grid gap-1 rounded-xl bg-muted/50 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p
        className={
          tone === "success"
            ? "font-heading text-2xl font-semibold text-emerald-600 dark:text-emerald-400"
            : tone === "danger"
              ? "font-heading text-2xl font-semibold text-destructive"
              : "font-heading text-2xl font-semibold"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function ProjectDetailCard({
  isLoading = false,
  project,
  stats,
  onBack,
  onEdit,
  onCreateTask,
}: ProjectDetailCardProps) {
  return (
    <section className="grid gap-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-fit"
        onClick={onBack}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Voltar
      </Button>

<div className="grid gap-4">
        <div className="grid gap-4">
          {isLoading || !project ? (
            <div className="grid gap-3 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
              <Skeleton className="h-7 w-2/3 max-w-72" />
              <Skeleton className="h-4 w-full max-w-md" />
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="grid gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <FolderIcon />
                      Projeto
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <ListChecksIcon />
                      {stats.total} tarefas
                    </Badge>
                  </div>
                  <h1 className="font-heading text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h1>
                  <p className="max-w-full text-sm text-muted-foreground sm:max-w-xl">
                    {project.description || "Sem descrição."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <CalendarClockIcon className="size-3.5" />
                    <span>Criado em {formatDateTime(project.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatItem
                  icon={<ListChecksIcon className="size-3.5" />}
                  label="Total"
                  value={stats.total}
                />
                <StatItem
                  icon={<CheckCircle2Icon className="size-3.5" />}
                  label="Concluídas"
                  value={stats.completed}
                  tone="success"
                />
                <StatItem
                  icon={<ClockIcon className="size-3.5" />}
                  label="Pendentes"
                  value={stats.pending}
                />
                <StatItem
                  icon={<TriangleAlertIcon className="size-3.5" />}
                  label="Atrasadas"
                  value={stats.overdue}
                  tone="danger"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground">
                  Por prioridade:
                </span>
                <Badge variant="destructive">Alta {stats.byPriority.HIGH}</Badge>
                <Badge variant="secondary">Média {stats.byPriority.MEDIUM}</Badge>
                <Badge variant="outline">Baixa {stats.byPriority.LOW}</Badge>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            <PencilIcon data-icon="inline-start" />
            Editar
          </Button>
          <Button type="button" size="sm" onClick={onCreateTask}>
            <PlusIcon data-icon="inline-start" />
            Nova tarefa
          </Button>
        </div>
      </div>
    </section>
  );
}