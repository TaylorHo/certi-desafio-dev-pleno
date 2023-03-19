// import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
    },
  });
  // app.enableCors({
  //   origin: process.env.CORS_WHITE_LIST,
  // });

  // const config = new DocumentBuilder()
  //   .setTitle('CERTI Challenge Logger API')
  //   .setDescription('API de gerenciamento de logs criada para o desafio da CERTI.')
  //   .setVersion('1.0.0')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/v1', app, document, {
  //   customSiteTitle: 'Logger API',
  // });

  // app.setGlobalPrefix('api/v1');
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(process.env.PORT || 3001);
  await app.listen();
}
bootstrap();
