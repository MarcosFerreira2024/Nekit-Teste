"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PROJECTS_KEY } from "@/hooks/use-projects";
import type { Project } from "@/types/project";

export const PROJECTS_PAGE_SIZE = 12;

export function useProjectInfinite() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [debouncedDescription, setDebouncedDescription] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTitle(title.trim()), 400);
    return () => clearTimeout(timer);
  }, [title]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDescription(description.trim()), 400);
    return () => clearTimeout(timer);
  }, [description]);

  const query = {
    title: debouncedTitle || undefined,
    description: debouncedDescription || undefined,
  };

  const result = useInfiniteQuery({
    queryKey: [PROJECTS_KEY, "infinite", query],
    queryFn: ({ pageParam }) =>
      api.get<Project[]>("/projects", {
        ...query,
        page: pageParam,
        size: PROJECTS_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });

  const rawProjects = result.data?.pages.flat() ?? [];
  const projects = [
    ...new Map(rawProjects.map((project) => [project.id, project])).values(),
  ];
  const errorMessage =
    result.error instanceof Error ? result.error.message : "";

  function reset() {
    setTitle("");
    setDescription("");
  }

  return {
    title,
    onTitleChange: setTitle,
    description,
    onDescriptionChange: setDescription,
    onReset: reset,
    projects,
    isPending: result.isPending,
    isError: result.isError,
    errorMessage,
    refetch: result.refetch,
    loadMore: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
  };
}

export type ProjectInfinite = ReturnType<typeof useProjectInfinite>;