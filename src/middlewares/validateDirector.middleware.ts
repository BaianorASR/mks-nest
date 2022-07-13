import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/database/entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Director)
    private categoryRepository: Repository<Director>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        director: { id, name },
      } = req.body;

      if (!id || !name || id === undefined || name === undefined) {
        throw new BadRequestException(
          'Object of director is invalid, expect keys id and name',
        );
      }

      await this.categoryRepository.findOneByOrFail({ id, name });

      next();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
