import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SkillFilterArgs {
  @Field(() => String, { nullable: true })
  category?: string;
}
