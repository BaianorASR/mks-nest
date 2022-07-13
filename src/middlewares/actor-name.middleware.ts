import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from 'src/database/entities/actor.entity';

@Injectable()
export class ActorNameMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const actor = await this.actorRepository.findOneBy({ name });

    if (actor) throw new BadRequestException('Actor name already exists');
    next();
  }
}
