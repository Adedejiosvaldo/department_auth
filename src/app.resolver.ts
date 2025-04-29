import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppModuleResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
