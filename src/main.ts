import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe());
  
  // Seed initial user if needed
  const usersService = app.get(UsersService);
  try {
    const existingUser = await usersService.findOne('admin');
    if (!existingUser) {
      await usersService.create('admin', 'password123');
      console.log('Created initial admin user');
    }
  } catch (error) {
    console.error('Error seeding initial user:', error);
  }

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
