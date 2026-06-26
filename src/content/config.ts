import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const termsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/terms" }),
  schema: z.object({
    term: z.string(),
    slug: z.string(),
    short_definition: z.string(),
    category: z.enum([
      "symptoms",
      "conditions",
      "medications",
      "therapy-terms",
      "psychiatry-terms",
      "psychology-terms",
      "brain-body-terms",
      "everyday-language",
      "research-terms",
    ]),
    also_known_as: z.array(z.string()).optional(),
    related_terms: z.array(z.string()).optional(),
    related_conditions: z.array(z.string()).optional(),
    related_treatments: z.array(z.string()).optional(),
    related_medications: z.array(z.string()).optional(),
    network_links: z
      .array(
        z.object({
          site: z.enum([
            "shrinkopedia",
            "anxietyresource",
            "depressionresource",
            "psychiatryrx",
            "anxietyresearch",
            "shrinq",
            "unstuck",
            "shrinkmd",
          ]),
          url: z.string().url(),
          label: z.string(),
        })
      )
      .optional(),
    sources: z.array(
      z.object({
        title: z.string(),
        publisher: z.string(),
        url: z.string().url(),
      })
    ),
    medical_reviewer: z.string().default("Shariq Refai, MD, MBA, FAPA"),
    published: z.string(),
    last_reviewed: z.string(),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    long_description: z.string(),
    icon: z.string().optional(),
    order: z.number(),
  }),
});

const comparisonsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparisons" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    short_answer: z.string(),
    intro: z.string(),
    terms: z.array(
      z.object({
        name: z.string(),
        slug: z.string().optional(),
      })
    ),
    table: z.array(
      z.object({
        dimension: z.string(),
        values: z.array(z.string()),
      })
    ),
    related_terms: z.array(z.string()).optional(),
    network_links: z
      .array(
        z.object({
          site: z.enum([
            "shrinkopedia",
            "anxietyresource",
            "depressionresource",
            "psychiatryrx",
            "anxietyresearch",
            "shrinq",
            "unstuck",
            "shrinkmd",
          ]),
          url: z.string().url(),
          label: z.string(),
        })
      )
      .optional(),
    sources: z.array(
      z.object({
        title: z.string(),
        publisher: z.string(),
        url: z.string().url(),
      })
    ),
    medical_reviewer: z.string().default("Shariq Refai, MD, MBA, FAPA"),
    published: z.string(),
    last_reviewed: z.string(),
    order: z.number().optional(),
  }),
});

const faqsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faqs" }),
  schema: z.object({
    slug: z.string(),
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),
  }),
});

export const collections = {
  terms: termsCollection,
  categories: categoriesCollection,
  comparisons: comparisonsCollection,
  faqs: faqsCollection,
};
