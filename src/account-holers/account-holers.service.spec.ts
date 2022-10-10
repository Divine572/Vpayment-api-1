import { Test, TestingModule } from '@nestjs/testing';
import { AccountHolersService } from './account-holers.service';

describe('AccountHolersService', () => {
  let service: AccountHolersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountHolersService],
    }).compile();

    service = module.get<AccountHolersService>(AccountHolersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
