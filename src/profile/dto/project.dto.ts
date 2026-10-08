export interface ProjectDto {
  id: number;
  name: string;
  url: string;
  repositoryUrl: string | null;
  description: string;
  stack: string | null;
}
