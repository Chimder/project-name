import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private accountService: AccountService,
  ) {}

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email: email } });
  }
  findByEmailOrName(identifier: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });
  }

  async create(email: string, hash: string, salt: string, name: string) {
    const user = await this.prisma.user.create({
      data: { email, hash, salt, name },
    });
    await this.accountService.createAccount(user.id, user.name);
    return user;
  }
}
