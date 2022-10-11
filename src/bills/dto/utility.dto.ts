import { Expose } from 'class-transformer';

export class PayBillsDto {
  @Expose()
  amount: number;

  @Expose()
  billerId: number;

  @Expose()
  subscribersAccountNumber: number;
}
