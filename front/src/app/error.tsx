"use client";

import { useEffect } from "react";
import { TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-64 place-items-center">
      <div className="grid max-w-md gap-4 text-center">
        <div className="mx-auto grid size-10 place-items-center rounded-full bg-destructive/10">
          <TriangleAlertIcon className="size-5 text-destructive" />
        </div>
        <div className="grid gap-1">
          <h1 className="font-heading text-lg font-semibold tracking-tight">
            Algo deu errado
          </h1>
          <p className="text-sm text-muted-foreground">
            Ocorreu um erro inesperado. Tente novamente.
          </p>
        </div>
        <div>
          <Button type="button" onClick={retry}>
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}