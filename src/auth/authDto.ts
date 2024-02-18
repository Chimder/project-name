import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class singUpBodyDto {
  @IsEmail()
  @ApiProperty({ example: 'lol@gmail.com' })
  email: string;

  @ApiProperty({ example: 'lol' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  password: string;
}
export class isNameTaken {
  @ApiProperty({ example: 'lol' })
  name: string;
}

export class singInBodyDto {
  @ApiProperty({ example: 'lol' })
  identifier: string;

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
