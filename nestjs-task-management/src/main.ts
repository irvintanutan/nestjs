import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';

async function bootstrap() {

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const PORT = 3000;
  await app.listen(PORT);

  logger.log(`Application listening on port ${PORT}`)

}
bootstrap();
