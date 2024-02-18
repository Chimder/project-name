import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async getMail(email: string) {
    console.log(email);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      // template: '/reset-password',
      template: 'src/mail/templates/reset-password',
      context: {
        name: 'John Doe',
        url: 'https://example.com/reset-password',
      },
    });
  }
}
