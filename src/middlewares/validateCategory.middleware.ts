import { NextFunction, Request, Response } from 'express';

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { categories } = req.body;

      await Promise.all(
        categories.map(async ({ id, name }: Category) => {
          if (!id || !name || id === undefined || name === undefined) {
            throw new BadRequestException(
              'Object in categories is invalid, expect keys id and name',
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
