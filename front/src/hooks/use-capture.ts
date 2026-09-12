"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas-pro";

export type CaptureAction = "copyImage" | "download" | "copyText" | null;

type UseCaptureOptions = {
  fileNamePrefix?: string;
  backgroundColor?: string;
  formatText?: () => string;
};

function sanitizeFileName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Não foi possível gerar a imagem."));
    }, "image/png");
  });
}

function buildText(source: HTMLElement): string {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-capture-exclude]").forEach((node) => node.remove());
  clone.querySelectorAll("button").forEach((node) => node.remove());
  return (clone.innerText || "").replace(/\n{3,}/g, "\n\n").trim();
}

export function useCapture(options: UseCaptureOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const busyRef = useRef(false);
  const [busyAction, setBusyAction] = useState<CaptureAction>(null);

  async function renderCanvas(): Promise<HTMLCanvasElement> {
    const source = containerRef.current;
    if (!source) throw new Error("Elemento de captura não encontrado.");

    const width = source.clientWidth || source.offsetWidth || 800;
    const clone = source.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-capture-exclude]").forEach((node) => node.remove());

    const wrapper = document.createElement("div");
    wrapper.setAttribute("aria-hidden", "true");
    Object.assign(wrapper.style, {
      position: "fixed",
      left: "-100000px",
      top: "0",
      width: `${width}px`,
      pointerEvents: "none",
      zIndex: "-1",
    });
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      return await html2canvas(clone, {
        backgroundColor: options.backgroundColor ?? "#ffffff",
        scale: Math.min(Math.max(window.devicePixelRatio || 1, 2), 3),
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: clone.scrollWidth || width,
        windowHeight: clone.scrollHeight,
      });
    } finally {
      wrapper.remove();
    }
  }

  async function run(type: CaptureAction, listener: () => Promise<void>) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusyAction(type);
    try {
      await listener();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha na captura.";
      toast.error(message);
    } finally {
      busyRef.current = false;
      setBusyAction(null);
    }
  }

  async function copyText(): Promise<void> {
    await run("copyText", async () => {
      const text = options.formatText
        ? options.formatText()
        : (() => {
            const source = containerRef.current;
            if (!source) throw new Error("Elemento de captura não encontrado.");
            return buildText(source);
          })();
      if (!text) throw new Error("Não há texto para copiar.");
      await navigator.clipboard.writeText(text);
      toast.success("Texto copiado para a área de transferência.");
    });
  }

  async function copyImage(): Promise<void> {
    await run("copyImage", async () => {
      if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
        throw new Error(
          "Seu navegador não permite copiar imagens. Use o botão de download."
        );
      }
      const canvas = await renderCanvas();
      const blob = await canvasToBlob(canvas);
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("Imagem copiada para a área de transferência.");
    });
  }

  async function downloadImage(): Promise<void> {
    await run("download", async () => {
      const canvas = await renderCanvas();
      const blob = await canvasToBlob(canvas);

      const prefix = options.fileNamePrefix
        ? sanitizeFileName(options.fileNamePrefix)
        : "captura";
      const now = new Date();
      const pad = (value: number) => String(value).padStart(2, "0");
      const stamp = [
        pad(now.getDate()),
        pad(now.getMonth() + 1),
        now.getFullYear(),
        pad(now.getHours()),
        pad(now.getMinutes()),
        pad(now.getSeconds()),
      ].join("-");
      const fileName = `${prefix}-${stamp}.png`;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      toast.success("Imagem baixada.");
    });
  }

  return {
    containerRef,
    busyAction,
    isBusy: busyAction !== null,
    copyText,
    copyImage,
    downloadImage,
  };
}

export type Capture = ReturnType<typeof useCapture>;