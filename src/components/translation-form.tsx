"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const LANGUAGES = {
  en_XX: "English",
  fr_XX: "French",
  de_DE: "German",
  es_XX: "Spanish",
  zh_CN: "Chinese",
  // Add more languages as needed
};

export default function TranslationForm() {
  const [source, setSource] = useQueryState("source", { defaultValue: "" });
  const [targetLang, setTargetLang] = useQueryState("targetLang", {
    defaultValue: "fr_XX",
  });
  const [translation, setTranslation] = useState("");
  const debouncedSource = useDebounce(source, 300);

  useEffect(() => {
    if (debouncedSource) {
      translateText(debouncedSource, targetLang);
    } else {
      setTranslation("");
    }
  }, [debouncedSource, targetLang]);

  async function translateText(text: string, target: string) {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: text, targetLang: target }),
      });
      const data = await response.json();
      if (data.ok) {
        setTranslation(data.output);
      } else {
        console.error("Translation error:", data.error);
      }
    } catch (error) {
      console.error("Failed to translate:", error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          className="flex-grow"
          placeholder="Enter text to translate"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardContent className="p-4">
          <p>{translation || "Translation will appear here"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
