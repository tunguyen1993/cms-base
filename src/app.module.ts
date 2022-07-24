import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientModule } from './modules/client';
import { CmsModule } from './modules/cms';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { ROUTE } from './route';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  getEnvPath,
  HttpExceptionFilter,
  LoggingInterceptor,
  LoggerModule,
} from './common';
import { SeedsModule } from './seeds/seeds.module';
const envFilePath: string = getEnvPath(`${__dirname}/../`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: 'uploads',
      rootPath: join(__dirname, '..', 'upload'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DATABASE_USERNAME');
        const password = configService.get('DATABASE_PASSWORD');
        const host = configService.get('DATABASE_HOST');
        const database = configService.get('DATABASE_NAME');
        return {
          uri: `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`,
          dbName: database,
          useNewUrlParser: true,
          connectionFactory: (connection) => {
            connection.plugin(require('mongoose-autopopulate'));
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    RouterModule.register(ROUTE),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LoggerModule,
    ClientModule,
    CmsModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
