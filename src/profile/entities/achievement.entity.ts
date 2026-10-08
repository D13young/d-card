import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AchievementDto } from '../dto/experience.dto';

@ObjectType()
export class AchievementEntity implements AchievementDto {
  @Field(() => Int)
  id!: number;

  @Field()
  text!: string;
}
