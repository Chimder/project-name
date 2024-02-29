import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tritch auth')
    .setDescription('for auth test')
    .setVersion('1.0')
    .addTag('Tritch')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  // const port = process.env.PORT ?? 4000;
  await app.listen(8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
