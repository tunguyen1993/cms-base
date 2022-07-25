import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthenticationModule } from './modules/client';
import {
  AuthenticationModule as AuthenticationModuleCMS,
  RoleModule,
  PermissionsModule,
  UserModule,
} from './modules/cms';
import { HttpInterceptor, ValidateInputPipe } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalInterceptors(new HttpInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  const clientConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('CLIENT API DOCUMENT')
    .setVersion('1.0')
    .build();

  const cmsConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('CMS API DOCUMENT')
    .setVersion('1.0')
    .build();

  const cmsDocument = SwaggerModule.createDocument(app, cmsConfig, {
    include: [
      AuthenticationModuleCMS,
      PermissionsModule,
      RoleModule,
      UserModule,
    ],
  });
  const clientDocument = SwaggerModule.createDocument(app, clientConfig, {
    include: [AuthenticationModule],
  });

  SwaggerModule.setup('client', app, clientDocument);
  SwaggerModule.setup('cms', app, cmsDocument);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then();
