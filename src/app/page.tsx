import TranslationForm from "@/components/translation-form";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-time Translation</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TranslationForm />
      </Suspense>
    </div>
  );
}
