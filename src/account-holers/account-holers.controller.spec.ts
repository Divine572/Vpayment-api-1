import { Test, TestingModule } from '@nestjs/testing';
import { AccountHolersController } from './account-holers.controller';

describe('AccountHolersController', () => {
  let controller: AccountHolersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountHolersController],
    }).compile();

    controller = module.get<AccountHolersController>(AccountHolersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
