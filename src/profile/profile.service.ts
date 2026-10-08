import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';

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
}
