import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto, PatchAccountDto } from './accountDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { getSessionDto } from 'src/auth/authDto';

@Controller('account')
export class AccountController {
  constructor(private accountServise: AccountService) {}

  @Get()
  @ApiOkResponse({ type: AccountDto })
  getAccount(@SessionInfo() session: getSessionDto) {
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
