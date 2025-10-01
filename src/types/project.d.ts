export type ProjectStatus = "development" | "concluded";

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
  icon: string;
  technologies: Technologies[];
  projectUrl: string;
  codeUrl: string;
  status: ProjectStatus;
  visibility: boolean;
}
