import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';

@Module({
  imports: [ConfigModule],
  controllers: [AirtimeController],
  providers: [AirtimeService],
})
export class AirtimeModule {}
