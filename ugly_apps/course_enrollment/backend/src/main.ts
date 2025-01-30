import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors()

  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies or HTTP authentication
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
