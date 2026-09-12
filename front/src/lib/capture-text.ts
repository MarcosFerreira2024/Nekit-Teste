import { PRIORITY_LABELS } from "@/lib/task-presentation";
import { formatDate, formatDateTime } from "@/lib/format";
import type { Project } from "@/types/project";
import type { ProjectStats } from "@/hooks/use-project-stats";
import type { Task } from "@/types/task";

function taskStatus(task: Task): string {
  return task.completed ? "Concluída" : "Pendente";
}

export function taskToText(
  task: Task,
  projectTitle?: string | null
): string {
  const lines = [
    `# Tarefa: ${task.title}`,
    "",
    `- Status: ${taskStatus(task)}`,
    `- Prioridade: ${PRIORITY_LABELS[task.priority]}`,
    `- Data limite: ${formatDate(task.dueDate)}`,
    `- Criada em: ${formatDateTime(task.createdAt)}`,
  ];

  if (projectTitle) {
    lines.push(`- Projeto: ${projectTitle}`);
  }

  return lines.join("\n");
}

export function projectToText(
  project: Project,
  stats: ProjectStats
): string {
  return [
    `# Projeto: ${project.title}`,
    "",
    project.description || "",
    "",
    "## Estatísticas",
    "",
    `- Total de tarefas: ${stats.total}`,
    `- Concluídas: ${stats.completed}`,
    `- Pendentes: ${stats.pending}`,
    `- Atrasadas: ${stats.overdue}`,
    `- Alta prioridade: ${stats.byPriority.HIGH}`,
    `- Média prioridade: ${stats.byPriority.MEDIUM}`,
    `- Baixa prioridade: ${stats.byPriority.LOW}`,
    "",
    `- Criado em: ${formatDateTime(project.createdAt)}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function projectTasksToText(
  project: Project,
  tasks: Task[]
): string {
  const header = [
    `# Projeto: ${project.title}`,
    "",
    project.description || "",
    "",
    `- Criado em: ${formatDateTime(project.createdAt)}`,
  ].filter((line) => line !== "");

  if (tasks.length === 0) {
    return [...header, "", "## Tarefas", "", `- Nenhuma tarefa.`].join("\n");
  }

  const taskLines = tasks.map((task) => {
    const checkbox = task.completed ? "[x]" : "[ ]";
    const state = task.completed ? "Concluída" : "Pendente";
    return (
      `\n- ${checkbox} ${task.title}\n` +
      `  - Status: ${state}\n` +
      `  - Prioridade: ${PRIORITY_LABELS[task.priority]}\n` +
      `  - Data limite: ${formatDate(task.dueDate)}`
    );
  });

  return [
    ...header,
    "",
    `## Tarefas (${tasks.length})`,
    ...taskLines,
  ].join("\n");
}