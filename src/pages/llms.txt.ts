import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const terms = (await getCollection("terms")).sort((a, b) =>
    a.data.term.localeCompare(b.data.term)
  );
  const categories = (await getCollection("categories")).sort(
    (a, b) => a.data.order - b.data.order
  );

  const lines: string[] = [];
  lines.push("# Shrinktionary");
  lines.push("");
  lines.push(
    "> A plain-English mental health dictionary explaining symptoms, diagnoses, medications, and therapy terms. Written and medically reviewed by Shariq Refai, MD, MBA, FAPA, a board certified psychiatrist. Part of The Shrink Network. Education only, not medical advice."
  );
  lines.push("");
  lines.push("## Standing pages");
  lines.push("- [About](https://shrinktionary.com/about/)");
  lines.push("- [Editorial standards](https://shrinktionary.com/editorial-standards/)");
  lines.push("- [Medical review](https://shrinktionary.com/medical-review/)");
  lines.push("- [Sources](https://shrinktionary.com/sources/)");
  lines.push("- [Disclaimer](https://shrinktionary.com/disclaimer/)");
  lines.push("- [The Term Web](https://shrinktionary.com/term-web/)");
  lines.push("");
  lines.push("## Categories");
  for (const c of categories) {
    lines.push(
      `- [${c.data.name}](https://shrinktionary.com/categories/${c.data.slug}/): ${c.data.description}`
    );
  }
  lines.push("");
  lines.push("## Terms");
  for (const t of terms) {
    lines.push(
      `- [${t.data.term}](https://shrinktionary.com/terms/${t.data.slug}/): ${t.data.short_definition}`
    );
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
