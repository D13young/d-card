import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { calculateDuration } from '../common/utils/date.util';
import { ExperienceEntity } from './entities/experience.entity';

@Resolver(() => ExperienceEntity)
export class ExperienceResolver {
  @ResolveField(() => String)
  duration(@Parent() experience: ExperienceEntity): string {
    return calculateDuration(experience.startDate, experience.endDate);
  }
}
