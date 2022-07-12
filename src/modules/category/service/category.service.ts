import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Like, Repository } from 'typeorm';

import { CreateCategoryDto } from '../DTOs/create-category.dto';
import { UpdateCategoryDto } from '../DTOs/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.save(createCategoryDto);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: Like(`%${name}%`) },
    });

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { affected } = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    if (!affected)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const { affected } = await this.categoryRepository.delete(id);

    if (!affected)
      throw new HttpException("Can't delete category", HttpStatus.NOT_FOUND);
  }
}
