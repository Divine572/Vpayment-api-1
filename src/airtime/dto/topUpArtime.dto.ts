import { Expose } from 'class-transformer';

export class AirtimeDto {
  @Expose()
  amount: number;

  @Expose()
  operatorId: number;

  @Expose()
  recipientPhone: number;
}
