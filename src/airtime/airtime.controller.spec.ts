import { Test, TestingModule } from '@nestjs/testing';
import { AirtimeController } from './airtime.controller';

describe('AirtimeController', () => {
  let controller: AirtimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirtimeController],
    }).compile();

    controller = module.get<AirtimeController>(AirtimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
