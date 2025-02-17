import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Sobe aí - Upload Temporário de Arquivos",
  description:
    "Envie imagens e vídeos sem compressão e gere um link temporário para compartilhamento. Rápido, seguro e gratuito!",
  keywords: [
    "upload de arquivos",
    "upload temporário",
    "compartilhar arquivos",
    "enviar vídeos sem compressão",
    "imagens sem compressão",
    "armazenamento de arquivos temporário",
  ],
  authors: [{ name: "Pedro Vieira", url: "https://pedrovs.dev" }],
  creator: "Pedro Vieira",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Sobe aí - Upload Temporário de Arquivos",
    description:
      "Envie imagens e vídeos sem compressão e gere um link temporário para compartilhamento.",
    url: "https://sobe-ai.pedrovs.dev",
    siteName: "Sobe aí",
    images: [
      {
        url: "https://sobe-ai.pedrovs.dev/preview.webp",
        width: 1200,
        height: 630,
        alt: "Sobe aí - Upload Temporário de Arquivos",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobe aí - Upload Temporário de Arquivos",
    description:
      "Envie imagens e vídeos sem compressão e gere um link temporário para compartilhamento.",
    images: ["https://sobe-ai.pedrovs.dev/preview.webp"],
    creator: "@pedrow023",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sora.variable} ${inter.variable} subpixel-antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
