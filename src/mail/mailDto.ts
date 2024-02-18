import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty()
  email: string;
}
