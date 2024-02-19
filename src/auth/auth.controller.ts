import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  getSessionDto,
  isNameTaken,
  singInBodyDto,
  singUpBodyDto,
} from './authDto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private emailService: MailService,
  ) {}
  @Post('sing-up')
  @ApiCreatedResponse()
  async singUp(
    @Body() body: singUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      body.email,
      body.password,
      body.name,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sing-in')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async singIn(
    @Body() body: singInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.identifier,
      body.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('isNameTake')
  @ApiOkResponse({ type: isNameTaken })
  @HttpCode(HttpStatus.OK)
  async isNameTake(@Query('name') name: string) {
    return this.authService.isNameTaken(name);
  }

  @Post('sing-out')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  singOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @SkipThrottle({ default: false })
  @ApiOkResponse({
    type: getSessionDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: getSessionDto) {
    return session;
  }

  @Post('resetPassReq')
  @ApiOkResponse()
  async requestPasswordReset(@Query('email') email: string) {
    const { resetToken } = await this.authService.requestPasswordReset(email);
    await this.emailService.getMail(email, resetToken);
  }

  @Post('resetPassword')
  @ApiOkResponse()
  async PasswordReset(
    @Query('token') token: string,
    @Query('newPassword') newpassword: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.resetPassword(
      token,
      newpassword,
    );
    this.cookieService.setToken(res, accessToken);
  }
}
