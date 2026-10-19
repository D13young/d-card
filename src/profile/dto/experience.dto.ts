export interface AchievementDto {
  id: number;
  text: string;
}

export interface ExperienceDto {
  id: number;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  stack: string | null;
  achievements: AchievementDto[];
}
