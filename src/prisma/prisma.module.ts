import { Global, Module } from '@nestjs/common';
import { DatabaseInitializerService } from './database-initializer.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseInitializerService],
  exports: [PrismaService],
})
export class PrismaModule {}
