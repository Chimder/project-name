import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static tokenKey = 'access-token-tritch';
  static tokenKeyReset = 'access-token-tritch-reset';
  setToken(res: Response, token: string) {
    res.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 100 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.tokenKey, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }
}
