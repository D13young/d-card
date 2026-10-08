import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileDto } from '../dto/profile.dto';
import { ExperienceEntity } from './experience.entity';
import { ProjectEntity } from './project.entity';
import { SkillEntity } from './skill.entity';

@ObjectType()
export class ProfileEntity implements ProfileDto {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  githubUrl!: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl!: string | null;

  @Field(() => String, { nullable: true })
  websiteUrl!: string | null;

  @Field(() => String, { nullable: true })
  location!: string | null;

  @Field(() => [SkillEntity])
  skills!: SkillEntity[];

  @Field(() => [ExperienceEntity])
  experience!: ExperienceEntity[];

  @Field(() => [ProjectEntity])
  projects!: ProjectEntity[];
}
