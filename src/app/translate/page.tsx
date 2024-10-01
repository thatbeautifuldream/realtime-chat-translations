import TranslationForm from "@/components/translation-form";

export default function TranslatePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-time Translation</h1>
      <TranslationForm />
    </div>
  );
}
