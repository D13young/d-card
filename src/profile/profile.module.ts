import { Module } from '@nestjs/common';
import { ExperienceResolver } from './experience.resolver';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileResolver, ProfileService, ExperienceResolver],
})
export class ProfileModule {}
