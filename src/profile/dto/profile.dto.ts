import { ExperienceDto } from './experience.dto';
import { ProjectDto } from './project.dto';
import { SkillDto } from './skill.dto';

export interface ProfileDto {
  id: number;
  name: string;
  title: string;
  description: string;
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  location: string | null;
  skills: SkillDto[];
  experience: ExperienceDto[];
  projects: ProjectDto[];
}
