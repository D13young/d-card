import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';

type ApolloPlugin = NonNullable<ApolloDriverConfig['plugins']>[number];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      sortSchema: true,
      introspection: true,
      graphiql: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          embed: true,
        }) as unknown as ApolloPlugin,
      ],
    }),
    ProfileModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}
