import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { patchNestJsSwagger } from 'nestjs-zod'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.SENTRY_ENABLED === 'true') {
    Sentry.init({
      integrations: [Sentry.nestIntegration(), nodeProfilingIntegration()],
    })
  }

  app.enableCors()

  patchNestJsSwagger()

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('You can use this API to shorten URLs')
    .setVersion('1.0')
    .setContact(
      'Vinicius Santos',
      'https://github.com/vini-cius',
      'viniciuskt0@gmail.com'
    )
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
    customSiteTitle: 'URL Shortener API',
  })

  await app.listen(process.env.SERVER_PORT || 3000)

  console.log(`server on: ${await app.getUrl()}`)
}

bootstrap()
