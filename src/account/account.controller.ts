import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto, PatchAccountDto } from './accountDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { getSessionDto } from 'src/auth/authDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('account')
export class AccountController {
  constructor(private accountServise: AccountService) {}

  @Get()
  @Throttle({ default: { limit: 2, ttl: 60 } })
  @ApiOkResponse({ type: AccountDto })
  @UseGuards(AuthGuard)
  getAccount(@SessionInfo() session: getSessionDto) {
    console.log('Test Account session', session);
    return this.accountServise.getAccount(session.id);
  }

  @Patch()
  @ApiOkResponse({ type: PatchAccountDto })
  pathcAccount(
    @Body() body: PatchAccountDto,
    @SessionInfo() session: getSessionDto,
  ) {
    return this.accountServise.pathcAccount(session.id, body);
  }
}
