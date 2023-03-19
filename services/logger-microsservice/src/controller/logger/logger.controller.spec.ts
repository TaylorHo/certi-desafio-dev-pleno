import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../../service/logger/logger.service';
import { LoggerController } from './logger.controller';

describe('LoggerController', () => {
  let controller: LoggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [LoggerService, { provide: getModelToken('Logger'), useValue: jest.fn() }],
    }).compile();

    controller = module.get<LoggerController>(LoggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
