import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectDto } from '../dto/project.dto';

@ObjectType()
export class ProjectEntity implements ProjectDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  url!: string;

  @Field(() => String, { nullable: true })
  repositoryUrl!: string | null;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  stack!: string | null;
}
