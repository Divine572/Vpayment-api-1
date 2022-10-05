import { Body, Controller, Post } from '@nestjs/common';
import { AirtimeService } from './airtime.service';

@Controller('airtime')
export class AirtimeController {
  constructor(private airtimeService: AirtimeService) {}
}
