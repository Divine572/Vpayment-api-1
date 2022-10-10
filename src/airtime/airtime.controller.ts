import { Body, Controller, Get, Post } from '@nestjs/common';
import { AirtimeService } from './airtime.service';

@Controller('airtime')
export class AirtimeController {
  constructor(private airtimeService: AirtimeService) {}

  @Get()
  test() {
    return 'hello';
  }
}
