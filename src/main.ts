import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de la validación global para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina props no declaradas en DTO
      forbidNonWhitelisted: true, // lanza error si hay props no permitidas
      transform: true // convierte tipos automáticamente (por ej., strings a Date)
    })
  );

  // Configuración de los interceptores globales
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Challenge API')
    .setDescription('Documentación API Challenge')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
