import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './authDto';

@Controller('auth')
export class AuthController {


  @Post("login"){
    login(@Body() authPayload:AuthPayloadDto){}
  }
}
