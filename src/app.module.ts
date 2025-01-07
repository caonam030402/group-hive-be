import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './modules/auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from '././modules/mail/config/mail.config';
import fileConfig from './modules/files/config/file.config';
import facebookConfig from './modules/auth-facebook/config/facebook.config';
import googleConfig from './modules/auth-google/config/google.config';
import appleConfig from './modules/auth-apple/config/apple.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAppleModule } from './modules/auth-apple/auth-apple.module';
import { AuthFacebookModule } from './modules/auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './modules/session/session.module';
import { MailerModule } from './modules/mailer/mailer.module';
import redisConfig from './redis/config/redis.config';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { OtpsModule } from './modules/otps/otps.module';
import { MailModule } from './modules/mail/mail.module';
import { chatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    chatModule,
    WorkspacesModule,
    OtpsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        appleConfig,
        redisConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthAppleModule,
    SessionModule,
    MailModule,
    MailerModule,
  ],
})
export class AppModule {}
