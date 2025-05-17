import DownloadComponent from "@/components/app/download";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Baixe seus arquivos!</h1>
      <DownloadComponent token={token} />
    </main>
  );
}
