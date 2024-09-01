import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { get } from 'http';
import { createWriteStream } from 'fs';

const serverUrl =
  'https://nest-learningintro-git-master-bakemono-sans-projects.vercel.app';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public')); // Serve static files from 'public'
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const config = new DocumentBuilder()
    .setTitle('Gestion Dettes')
    .setDescription('Une appli pour la gestion des dettes')
    .setVersion('1.0')
    .addTag('Dettes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
    response.pipe(createWriteStream('public/swagger-ui-bundle.js'));
    console.log(
      `Swagger UI bundle file written to: '/public/swagger-ui-bundle.js'`,
    );
  });

  get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
    response.pipe(createWriteStream('public/swagger-ui-init.js'));
    console.log(
      `Swagger UI init file written to: '/public/swagger-ui-init.js'`,
    );
  });

  get(
    `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
    function (response) {
      response.pipe(
        createWriteStream('public/swagger-ui-standalone-preset.js'),
      );
      console.log(
        `Swagger UI standalone preset file written to: '/public/swagger-ui-standalone-preset.js'`,
      );
    },
  );

  get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
    response.pipe(createWriteStream('public/swagger-ui.css'));
    console.log(`Swagger UI css file written to: '/public/swagger-ui.css'`);
  });

  await app.listen(3000);
}
bootstrap();
