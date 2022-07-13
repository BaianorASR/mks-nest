import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from 'src/database/entities/director.entity';

@Injectable()
export class DirectorNameMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const director = await this.directorRepository.findOneBy({ name });

    if (director) throw new BadRequestException('Director name already exists');
    next();
  }
}
