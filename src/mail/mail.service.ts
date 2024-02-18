import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async getMail(email: string) {
    // const username = 'dimas';
    // const resetUrl = 'lol.com';
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: '/reset-password',
      // context: {
      //   username: 'John Doe',
      //   resetUrl: 'https://example.com/reset-password',
      // },
    });
  }
}
