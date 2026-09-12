"use client";

import { SearchIcon, RotateCcwIcon, AlignLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProjectFilterBarProps = {
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  onReset: () => void;
};

export function ProjectFilterBar({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  onReset,
}: ProjectFilterBarProps) {
  const hasActiveFilters =
    title.trim() !== "" || description.trim() !== "";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Buscar por título..."
          className="w-64 pl-8"
          aria-label="Buscar projetos por título"
        />
      </div>

      <div className="relative">
        <AlignLeftIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Buscar por descrição..."
          className="w-64 pl-8"
          aria-label="Buscar projetos por descrição"
        />
      </div>

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={onReset}
        >
          <RotateCcwIcon data-icon="inline-start" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}