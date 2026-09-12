import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted-foreground">
      <Loader2Icon className="size-4 animate-spin" />
      <span>Carregando...</span>
    </div>
  );
}