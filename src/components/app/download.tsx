"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadComponent({ token }: { token: string }) {
  return (
    <div className="space-y-4 text-center">
      <Button asChild className="w-full">
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/download/${token}`}
          download
        >
          <Download className="mr-2 h-4 w-4" /> Baixar Arquivo
        </a>
      </Button>
    </div>
  );
}
