import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    MailModule,
    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: {
    //       host: 'smtp-mail.outlook.com',
    //       port: 587,
    //       ignoreTLS: true,
    //       secure: false,
    //       auth: {
    //         user: process.env.OUTLOOK_LOGIN,
    //         pass: process.env.OUTLOOK_PASSWORD,
    //       },
    //     },
    //     defaults: {
    //       from: '"nest-modules" <modules@nestjs.com>',
    //     },
    //     template: {
    //       dir: __dirname + '/templates',
    //       adapter: new PugAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),
    // MailModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
