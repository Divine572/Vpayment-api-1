import { Controller, Get, Post } from '@nestjs/common';

@Controller('cards')
export class CardsController {
  @Post('/create_Vcard')
  async create_Vcard() {}

  @Post('/fund_Vcard')
  async fund_Vcard() {}

  @Get('/list_Vcard')
  async list_Vcard() {}

  @Post('/pay')
  async pay_Vcard() {}
}
