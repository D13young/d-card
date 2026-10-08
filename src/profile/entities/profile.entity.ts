import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileEntity {
  @Field()
  name!: string;

  @Field()
  description!: string;
}
