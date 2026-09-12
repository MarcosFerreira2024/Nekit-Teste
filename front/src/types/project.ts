import type { Task } from "./task";

export type Project = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  tasks?: Task[];
};

export type CreateProjectInput = {
  title: string;
  description?: string;
};

export type UpdateProjectInput = {
  title?: string;
  description?: string;
};

export type ProjectQuery = {
  page: number;
  size: number;
  title?: string;
  description?: string;
};