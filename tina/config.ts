import { defineConfig } from "tinacms";

const bodyField = {
  type: "string",
  name: "body",
  label: "Body",
  isBody: true,
  ui: {
    component: "textarea",
  },
} as const;

export default defineConfig({
  branch: process.env.PROJECT_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "about_pt",
        label: "About (PT)",
        path: "content/pt/about",
        format: "mdx",
        fields: [bodyField],
      },
      {
        name: "post_pt",
        label: "Posts (PT)",
        path: "content/pt/posts",
        format: "mdx",
        fields: [bodyField],
      },
      {
        name: "project_pt",
        label: "Projects (PT)",
        path: "content/pt/projects",
        format: "mdx",
        fields: [bodyField],
      },
      {
        name: "about_en",
        label: "About (EN)",
        path: "content/en/about",
        format: "mdx",
        fields: [bodyField],
      },
      {
        name: "post_en",
        label: "Posts (EN)",
        path: "content/en/posts",
        format: "mdx",
        fields: [bodyField],
      },
      {
        name: "project_en",
        label: "Projects (EN)",
        path: "content/en/projects",
        format: "mdx",
        fields: [bodyField],
      },
    ],
  },
});
