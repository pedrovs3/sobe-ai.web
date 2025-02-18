"use client";

import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Copy, Upload } from "lucide-react";
import { useRef, useState } from "react";

const LIMIT_SIZE = 100 * 1024 * 1024;

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize > LIMIT_SIZE) {
        setError("O tamanho total dos arquivos excede o limite de 100MB.");
        return;
      }

      setFiles(selectedFiles);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha no upload.");

      const data = await response.json();
      setDownloadLink(data.download_link);
    } catch (err: unknown) {
      console.error(err);
      setError("Ocorreu um erro durante o upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(downloadLink);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                Clique para escolher arquivos
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF (Máx. 100MB)
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            accept="image/*,video/*,.mov,.mp4,.avi,.mkv,.wmv,.flv,.webm"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {files.length} arquivo(s) selecionado(s)
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploading && <Progress value={progress} className="w-full" />}

      {downloadLink && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>
            Seus arquivos foram enviados com sucesso.
            <div className="mt-2 flex items-center space-x-2 w-full">
              <input
                type="text"
                value={downloadLink}
                readOnly
                className="flex-grow p-2 text-sm border rounded"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                className="relative min-w-9 cursor-pointer"
              >
                <Copy
                  className={cn("h-4 w-4 transition-all absolute ease-in-out", {
                    "opacity-0": copied,
                    "text-gray-500": !copied,
                  })}
                />

                <Check
                  className={cn("h-4 w-4 absolute transition-all ease-in-out", {
                    "opacity-0": !copied,
                    "": copied,
                  })}
                />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="w-full"
      >
        {uploading ? "Enviando..." : "Enviar Arquivos"}
      </Button>
    </div>
  );
}
