export class CreateCardDto {
  accountHolderId: string;
  currency: string;
  amount: number;
}

export class FundCardDto {
  cardID: string;
  amount: string;
}

export class FetchTransactionsDto {
  id: string;
  page: number | null;
  from: Date | null;
  to: Date | null;
}
