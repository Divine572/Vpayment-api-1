import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillService } from './bills.service';
import { AirtimeDto } from './dto/airtime.dto';
import { PayBillsDto } from "./dto/utility.dto"

@Controller('airtime')
export class BillController {
  constructor(private billService: BillService) { }

  @Get()
  getOperatorsId() {
    return this.billService.getOperatorsID();
  }

  @Get()
  getBillers() {
    return this.billService.getBillers()
  }

  @Post()
  buyAirtimeOrData(@Body() dto: AirtimeDto) {
    return this.billService.buyAirtimeOrData(dto)
  }

  @Post()
  payUtilityBills(@Body() dto: PayBillsDto) {
    return this.billService.payUtilityBills(dto)
  }


}
