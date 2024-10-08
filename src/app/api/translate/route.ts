import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";
import { env } from "@/env";

const hf = new HfInference(env.HUGGINGFACE_ACCESS_TOKEN);

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
      // @ts-expect-error : parameters type unavailable in @huggingface/inference
      parameters: {
        src_lang: "en_XX",
        tgt_lang: body.targetLang,
      },
    });
    return NextResponse.json({
      ok: true,
      // @ts-expect-error : response type unavailable in @huggingface/inference
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
