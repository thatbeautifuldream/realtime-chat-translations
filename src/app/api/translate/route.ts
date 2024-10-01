import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HUGGINGFACE_ACCESS_TOKEN);

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.source || typeof body.source !== "string" || !body.targetLang) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const translation = await hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs: body.source,
      parameters: {
        src_lang: "en_XX", // Assuming English as source language
        tgt_lang: body.targetLang,
      },
    });
    return NextResponse.json({
      ok: true,
      output: translation.translation_text,
    });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to query Hugging Face" },
      { status: 500 }
    );
  }
}
