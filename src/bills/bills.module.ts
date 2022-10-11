import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillController } from './bills.controller';
import { BillService } from './bills.service';

@Module({
  imports: [ConfigModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillsModule { }
