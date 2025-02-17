import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  console.log(formData);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.error(response.json());
    return NextResponse.error();
  }

  console.log(response);

  const { download_link, message } = await response.json();

  return NextResponse.json({ download_link, message });
}
