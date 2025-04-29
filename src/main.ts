import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for client applications
  app.enableCors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Seed initial user if needed
  const usersService = app.get(UsersService);
  try {
    const existingUser = await usersService.findOne('admin');
    if (!existingUser) {
      await usersService.create(
        'admin',
        process.env.ADMIN_INITIAL_PASSWORD || 'password123',
      );
      console.log('Created initial admin user');
    }
  } catch (error) {
    console.error('Error seeding initial user:', error);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
