import { NotFoundException } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileEntity)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileEntity)
  async profile(): Promise<ProfileEntity> {
    const profile = await this.profileService.findProfile();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
