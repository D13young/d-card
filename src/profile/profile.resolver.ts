import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkillFilterArgs } from './dto/skill-filter.args';
import { ProfileEntity } from './entities/profile.entity';
import { SkillEntity } from './entities/skill.entity';
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

  @Query(() => [SkillEntity])
  async skills(
    @Args('filter', {
      type: () => SkillFilterArgs,
      nullable: true,
    })
    filter?: SkillFilterArgs,
  ): Promise<SkillEntity[]> {
    return this.profileService.findSkills(filter);
  }
}
