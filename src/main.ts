import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  patchNestJsSwagger()

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('You can use this API to shorten URLs')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
    customSiteTitle: 'URL Shortener API'
  });

  await app.listen(process.env.SERVER_PORT || 3000)

  console.log(`server on: ${await app.getUrl()}`);
}

bootstrap()
