import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SkillDto } from '../dto/skill.dto';

@ObjectType()
export class SkillEntity implements SkillDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  category!: string;
}
