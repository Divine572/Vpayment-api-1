import { Module } from '@nestjs/common';
import { AccountHolersController } from './account-holers.controller';
import { AccountHolersService } from './account-holers.service';

@Module({
  controllers: [AccountHolersController],
  providers: [AccountHolersService]
})
export class AccountHolersModule {}
