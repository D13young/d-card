import { execSync } from 'child_process';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { seedIfEmpty } from './seed-data';

@Injectable()
export class DatabaseInitializerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseInitializerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Applying database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    const created = await seedIfEmpty(this.prisma);
    this.logger.log(
      created
        ? 'Seed data created'
        : 'Database already contains data, seed skipped',
    );
  }
}
