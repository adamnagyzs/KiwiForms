import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getHealth returns wrapped health data', () => {
    const result = controller.getHealth();

    expect(result.data.status).toBe('ok');
    expect(result.data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
