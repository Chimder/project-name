import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  create(email: string, hash: string, salt: string) {
    return this.prisma.user.create({ data: { email, hash, salt } });
  }
}
