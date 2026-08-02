// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeAnchors } from "./src/plugins/rehype-anchors.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://mohitgumber.com",

  vite: {
    // Cast needed: @tailwindcss/vite types against vite 7 while astro bundles
    // vite 6, so the two Plugin types are structurally close but not identical.
    plugins: [
      /** @type {import("astro").ViteUserConfig["plugins"]} */ (
        /** @type {unknown} */ (tailwindcss())
      ),
    ],
  },

  markdown: {
    remarkPlugins: [remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor-link"],
            ariaLabel: "Link to this section",
          },
          content: { type: "text", value: " #" },
          test: (/** @type {{ tagName?: string }} */ node) =>
            node.tagName !== "h1",
        },
      ],
      [
        rehypeAnchors,
        {
          skip: (/** @type {{ path?: string } | undefined} */ file) =>
            /[\\/]posts[\\/]notes[\\/]/.test(file?.path ?? ""),
        },
      ],
    ],
  },

  redirects: {
    "/resume": {
      status: 301,
      destination: "/resume.pdf",
    },
    "/code": {
      status: 301,
      destination: "https://github.com/heresmohit",
    },
  },

  integrations: [
    mdx(),
    icon(),
    sitemap({
      // Keep admin tooling, machine-readable feeds, draft review pages, and
      // underscore-prefixed fixture pages (e.g. /_anchor-fixture) out of the
      // sitemap.
      filter: (page) =>
        !page.includes("/admin") &&
        !page.endsWith("/feed.xml") &&
        !new URL(page).pathname.startsWith("/drafts/") &&
        !/\/_/.test(new URL(page).pathname),
    }),
  ],
});
