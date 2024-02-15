import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { getSessionDto, singInBodyDto, singUpBodyDto } from './authDto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
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
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sing-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async singIn(
    @Body() body: singInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sing-out')
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  singOut(@Res({ passthrough: true }) res: Response) {
    console.log('Out', res);
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({
    type: getSessionDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: getSessionDto) {
    return session;
  }
}
