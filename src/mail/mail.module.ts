import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [
    BullModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: true,
        auth: {
          user: process.env.OUTLOOK_LOGIN,
          pass: process.env.OUTLOOK_PASSWORD,
        },
        requireTLS: true,
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [BullModule],
})
export class MailModule {}
