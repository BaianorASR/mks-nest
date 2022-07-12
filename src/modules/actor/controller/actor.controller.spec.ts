import { Test, TestingModule } from '@nestjs/testing';

import { ActorService } from '../service/actor.service';
import { ActorController } from './actor.controller';

describe('ActorController', () => {
  let controller: ActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [ActorService],
    }).compile();

    controller = module.get<ActorController>(ActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
