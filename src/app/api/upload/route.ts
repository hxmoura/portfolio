import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const image = await request.formData();

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: image,
      }
    );

    const data = await response.json();

    return NextResponse.json(data.data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
