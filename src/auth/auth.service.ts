import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './authDto';

const fakeUser = [
  {
    id: 1,
    username: 'dimas',
    password: '123',
  },
  {
    id: 2,
    username: 'lox',
    password: '1234',
  },
];
@Injectable()
export class AuthService {
  validateUser(authPayloadDto: AuthPayloadDto);
}
