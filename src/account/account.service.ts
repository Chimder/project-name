import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchAccountDto } from './accountDto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAccount(userId: number) {
    return this.prisma.account.findFirstOrThrow({ where: { ownerId: userId } });
  }

  async pathcAccount(userId: number, body: PatchAccountDto) {
    return this.prisma.account.update({
      where: { ownerId: userId },
      data: { isBlocking: body.isBlocking },
    });
  }

  createAccount(userId: number, name: string) {
    return this.prisma.account.create({
      data: { ownerId: userId, isBlocking: false, name: name },
    });
  }
}
