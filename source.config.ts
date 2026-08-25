import { defineConfig } from "fumadocs-mdx/config";

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "one-dark-pro",
        dark: "one-dark-pro",
      },
    },
  },
});
