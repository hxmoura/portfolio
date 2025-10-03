import stack from "../../content/data/tech.json";

export type ProjectStatus = "development" | "done";

interface Technologies {
  icon: string;
  label: string;
  description: string;
  color: string;
}

export interface Project {
  name: string;
  date: string;
  shortDescription: string;
  description: string;
  icon: string;
  technologies: (keyof typeof stack)[];
  projectUrl: string;
  codeUrl: string;
  status: ProjectStatus;
  visibility: boolean;
}
