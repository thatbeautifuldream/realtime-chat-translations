import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Real-time Translations</h1>
      <p>
        This is a simple real-time translation app that uses the Hugging Face
        API.
      </p>
      <p>
        <Link href="/translate">Translate</Link>
      </p>
    </>
  );
}
