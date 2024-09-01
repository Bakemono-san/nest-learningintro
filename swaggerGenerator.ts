import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import yaml from 'yaml';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Gestion Dettes')
    .setDescription('Une appli pour la gestion des dettes')
    .setVersion('1.0')
    .addTag('Dettes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./public/swagger.yaml', yaml.stringify(document));
  await app.close();
}

generateSwagger();
