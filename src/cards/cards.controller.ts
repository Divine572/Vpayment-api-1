import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCardDto, FundCardDto } from './card.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardService.createVirtualCard(dto);
  }

  @Post()
  fundCard(@Body() dto: FundCardDto) {
    return this.cardService.fundVirtualCard(dto);
  }

  @Get(':id')
  fetchCardTransactions(
    @Param('id')
    @Query()
    dto: {
      id: string;
      page: number;
      from: Date;
      to: Date;
    },
  ) {
    return this.cardService.fetchCardTransactions(dto);
  }

  @Get(':id')
  fetchCard(@Param('id') id: string) {
    return this.cardService.fetchCardDetails(id);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardService.deleteVirtualCard(id);
  }
}
