import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';
import { SkillDto } from './dto/skill.dto';
import { SkillFilterArgs } from './dto/skill-filter.args';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(): Promise<ProfileDto | null> {
    return this.prisma.profile.findFirst({
      include: {
        skills: { orderBy: { sortOrder: 'asc' } },
        experience: {
          orderBy: { startDate: 'desc' },
          include: {
            achievements: { orderBy: { sortOrder: 'asc' } },
          },
        },
        projects: { orderBy: { sortOrder: 'asc' } },
      },
    });
  }

  async findSkills(filter?: SkillFilterArgs): Promise<SkillDto[]> {
    return this.prisma.skill.findMany({
      where: filter?.category ? { category: filter.category } : undefined,
      orderBy: { sortOrder: 'asc' },
    });
  }
}
