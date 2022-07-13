import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';

@Injectable()
export class CategoryNameMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    const category = await this.categoryRepository.findOneBy({ name });

    if (category) throw new BadRequestException('Category name already exists');
    next();
  }
}
