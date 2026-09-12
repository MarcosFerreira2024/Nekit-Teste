"use client";

import { useState } from "react";
import type { Project } from "@/types/project";
import { useCreateProject, useUpdateProject } from "@/hooks/use-projects";

export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 60;

export type ProjectFormErrors = {
  title?: string;
  description?: string;
};

export function useProjectForm() {
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<Project | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ProjectFormErrors>({});

  const isEditing = Boolean(target);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function open(project?: Project) {
    setTarget(project);
    setTitle(project?.title ?? "");
    setDescription(project?.description ?? "");
    setErrors({});
    setIsOpen(true);
  }

  function close() {
    if (isSubmitting) return;
    setIsOpen(false);
  }

  function validate(): ProjectFormErrors {
    const nextErrors: ProjectFormErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Título é obrigatório.";
    } else if (title.length > TITLE_MAX_LENGTH) {
      nextErrors.title = `Título deve ter no máximo ${TITLE_MAX_LENGTH} caracteres.`;
    }

    if (description.length > DESCRIPTION_MAX_LENGTH) {
      nextErrors.description = `Descrição deve ter no máximo ${DESCRIPTION_MAX_LENGTH} caracteres.`;
    }

    return nextErrors;
  }

  function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const input = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    if (isEditing && target) {
      updateMutation.mutate(
        { id: target.id, input },
        { onSuccess: () => setIsOpen(false) }
      );
      return;
    }

    createMutation.mutate(input, { onSuccess: () => setIsOpen(false) });
  }

  return {
    isOpen,
    onOpenChange: setIsOpen,
    isEditing,
    isSubmitting,
    open,
    close,
    title,
    onTitleChange: setTitle,
    description,
    onDescriptionChange: setDescription,
    errors,
    handleSubmit,
  };
}

export type ProjectForm = ReturnType<typeof useProjectForm>;