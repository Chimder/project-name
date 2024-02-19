import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async getMail(email: string, token: string) {
    console.log(email);
    const url = `http://localhost:5173/reset-password/${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      // template: '/reset-password',
      template: 'src/mail/templates/reset-password',
      context: {
        // token: token,
        url: url,
      },
    });
  }
}
