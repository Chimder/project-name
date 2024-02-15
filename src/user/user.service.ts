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

  async create(email: string, hash: string, salt: string) {
    const user = await this.prisma.user.create({ data: { email, hash, salt } });
    await this.accountService.createAccount(user.id);
    return user;
  }
}
