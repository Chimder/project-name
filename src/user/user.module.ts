import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [PrismaModule, AccountModule],
  controllers: [UserController],
  providers: [UserService, AccountService],
  exports: [UserService],
})
export class UserModule {}
