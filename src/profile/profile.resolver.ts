import { Query, Resolver } from '@nestjs/graphql';
import { ProfileEntity } from './entities/profile.entity';

@Resolver(() => ProfileEntity)
export class ProfileResolver {
  @Query(() => ProfileEntity)
  profile(): ProfileEntity {
    const profile = new ProfileEntity();
    profile.name = 'Косиненко Сергей Александрович';
    profile.description =
      'Middle Fullstack Developer. Основной стек — C# / ASP.NET Core и React / Next.js + TypeScript.';
    return profile;
  }
}
