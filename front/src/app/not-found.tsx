import { FileQuestionIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-64 place-items-center">
      <div className="grid max-w-md gap-4 text-center">
        <div className="mx-auto grid size-10 place-items-center rounded-full bg-muted">
          <FileQuestionIcon className="size-5 text-muted-foreground" />
        </div>
        <div className="grid gap-1">
          <h1 className="font-heading text-lg font-semibold tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-sm text-muted-foreground">
            O recurso que você procura não existe ou foi removido.
          </p>
        </div>
        <div>
          <Button asChild>
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}