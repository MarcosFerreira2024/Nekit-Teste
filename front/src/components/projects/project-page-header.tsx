"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectPageHeaderProps = {
  onCreateClick: () => void;
};

export function ProjectPageHeader({
  onCreateClick,
}: ProjectPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="mr-auto">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Projetos
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seus projetos e suas tarefas.
        </p>
      </div>

      <Button type="button" onClick={onCreateClick}>
        <PlusIcon data-icon="inline-start" />
        Novo projeto
      </Button>
    </div>
  );
}