import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const terms = (await getCollection("terms")).sort((a, b) =>
    a.data.term.localeCompare(b.data.term)
  );

  const lines: string[] = [];
  lines.push("# Shrinktionary, Full Content");
  lines.push("");
  lines.push(
    "A plain-English mental health dictionary. Written and medically reviewed by Shariq Refai, MD, MBA, FAPA, a board certified psychiatrist. Part of The Shrink Network. Education only, not medical advice. If you're in crisis, call or text 988 in the United States."
  );
  lines.push("");

  for (const t of terms) {
    const d = t.data;
    lines.push("---");
    lines.push("");
    lines.push(`# ${d.term}`);
    lines.push("");
    lines.push(`URL: https://shrinktionary.com/terms/${d.slug}/`);
    lines.push(`Category: ${d.category}`);
    if (d.also_known_as && d.also_known_as.length > 0) {
      lines.push(`Also known as: ${d.also_known_as.join(", ")}`);
    }
    lines.push(`Medically reviewed by: ${d.medical_reviewer}`);
    lines.push(`Last reviewed: ${d.last_reviewed}`);
    lines.push("");
    lines.push(`Short definition: ${d.short_definition}`);
    lines.push("");
    // strip markdown headings/links to plain text
    const body = t.body
      .replace(/^---[\s\S]*?---/, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^#+\s*/gm, "")
      .trim();
    lines.push(body);
    lines.push("");
    if (d.sources && d.sources.length > 0) {
      lines.push("Sources:");
      for (const s of d.sources) {
        lines.push(`- ${s.title}, ${s.publisher} (${s.url})`);
      }
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
