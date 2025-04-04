export type ProjectStatus = "development" | "concluded";

export interface Project {
  name: string;
  shortDescription: string;
  wallpaper: string;
  images: string[];
  slug: string;
  status: ProjectStatus;
  linkProject: string;
  linkCode: string;
  linkUI: string;
  description: string;
  features: string;
  technologies: string;
  visible: boolean;
  id: string;
}
