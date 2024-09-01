import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import yaml from 'yaml';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // Serve static files from the 'public' directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const config = new DocumentBuilder()
    .setTitle('Gestion Dettes')
    .setDescription('Une appli pour la gestion des dettes')
    .setVersion('1.0')
    .addTag('Dettes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = yaml.stringify(document);

  // Write the Swagger YAML file to the 'public' directory
  writeFileSync('./public/swagger.yaml', yamlDocument);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
