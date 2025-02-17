import UploadForm from "@/components/app/upload-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:p-24 gap-8">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Sobe aí - Upload Temporário de Arquivos
        </h1>
        <span className="lg:text-lg max-w-xl text-sm text-center text-gray-500 dark:text-gray-400">
          Envie imagens e vídeos sem compressão e gere um link temporário para
          compartilhamento. Rápido, seguro e gratuito!
        </span>
      </div>

      <UploadForm />
    </main>
  );
}
