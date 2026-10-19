import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { ExperienceDto } from '../dto/experience.dto';
import { AchievementEntity } from './achievement.entity';

@ObjectType()
export class ExperienceEntity implements ExperienceDto {
  @Field(() => Int)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  stack!: string | null;

  @Field(() => String)
  duration?: string;

  @Field(() => [AchievementEntity])
  achievements!: AchievementEntity[];
}
