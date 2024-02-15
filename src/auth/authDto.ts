import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class singUpBodyDto {
  @IsEmail()
  @ApiProperty({ example: 'lol@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  password: string;
}

export class singInBodyDto {
  @ApiProperty({ example: 'lol@gmail.com' })
  email: string;

  @ApiProperty({ example: '1234' })
  password: string;
}

export class getSessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  'iat': number;

  @ApiProperty()
  'exp': number;
}
