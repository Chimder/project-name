import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { retry } from 'rxjs';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { MailDto } from './mailDto';

@Controller('mail')
export class MailController {
  constructor(private mailservice: MailService) {}
  @Post('mail')
  // @ApiResponse({ type: MailDto })
  @ApiOkResponse()
  getMail(@Query('email') email: string) {
    return this.mailservice.getMail(email);
  }
}
