import { defineConfig } from "tinacms";
import {
  aboutCollection,
  aboutHomeCollection,
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
    ],
  },
});
