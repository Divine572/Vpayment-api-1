export class CreateAccountDto {
  addressLine: string;
  lga: string;
  city: string;
  state: string;
  entity: string;
  firstname: string;
  lastname: string;
  bvn: string;
  phoneNumber: string;
  identityType: string;
  numberID: string;
  identityUrl: string;
}

export class AccountDto {
  accountID: string;
}
