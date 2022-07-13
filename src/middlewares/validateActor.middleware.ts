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
export class ActorMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Actor)
    private categoryRepository: Repository<Actor>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { actors } = req.body;

      await Promise.all(
        actors.map(async ({ id, name }: Actor) => {
          if (!id || !name || id === undefined || name === undefined) {
            throw new BadRequestException(
              'Object in actors is invalid, expect keys id and name',
            );
          }

          await this.categoryRepository.findOneByOrFail({ id, name });
        }),
      );

      next();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
