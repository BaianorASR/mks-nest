import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/database/entities/movie.entity';

@Injectable()
export class MovieNameMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;

    const movie = await this.movieRepository.findOneBy({ title });

    if (movie) throw new BadRequestException('Movie name already exists');
    next();
  }
}
