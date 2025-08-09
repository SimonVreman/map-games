import { readFile } from "fs/promises";

export async function GET() {
  const path = "app/(tools)/tools/wordlist/_words/wordlist.txt";
  const content = await readFile(path, "utf-8");

  const words = content.split(/\r?\n/).filter((line) => line.trim() !== "");

  const filtered = words
    .filter((word) => !/[ \-\d]/.test(word))
    .filter((word) => word.length > 3)
    .filter((word) => word[0] !== word[0].toUpperCase());

  const cleaned = filtered.map((word) =>
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );

  return new Response(cleaned.join("\n"), {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="words.txt"`,
      "Content-Encoding": "base64",
    },
  });
}
