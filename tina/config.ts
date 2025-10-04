import { defineConfig } from "tinacms";
import {
  aboutCollection,
  aboutHomeCollection,
  bodyField,
  postCollection,
  projectCollection,
  settingsCollection,
  technologiesCollection,
} from "./collections";

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
      settingsCollection,
      technologiesCollection,
      aboutHomeCollection,
      aboutCollection,
      postCollection,
      projectCollection,
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
