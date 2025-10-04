import stack from "../../content/data/tech.json";

export type ProjectStatus = "development" | "done";

export interface Project {
  name: string;
  publishedAt: string;
  shortDescription: string;
  description: string;
  icon: string;
  stacks: (keyof typeof stack)[];
  projectUrl: string;
  codeUrl: string;
  status: ProjectStatus;
  visibility: boolean;
}
