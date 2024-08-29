import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import yaml from 'yaml';
import { writeFileSync } from 'fs';

dotenv.config();
// console.log('JWT Secret:', process.env.TOKEN);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  const config = new DocumentBuilder()
    .setTitle('Gestion Dettes')
    .setDescription('une appli pour la gestion des dettes')
    .setVersion('1.0')
    .addTag('Dettes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = SwaggerModule.createDocument(app, config);
  writeFileSync('./swagger.yaml', yaml.stringify(yamlDocument));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
