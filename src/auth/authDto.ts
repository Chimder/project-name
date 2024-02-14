import { ApiProperty } from '@nestjs/swagger';

export class singUpBodyDto {
  @ApiProperty({ example: 'lol@gmail.com' })
  email: string;

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
