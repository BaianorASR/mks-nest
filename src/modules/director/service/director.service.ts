import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/database/entities/director.entity';
import { Repository } from 'typeorm';

import { CreateDirectorDto } from '../DTOs/create-director.dto';
import { UpdateDirectorDto } from '../DTOs/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    try {
      const director = await this.directorRepository.save(createDirectorDto);
      return director;
    } catch (error) {
      throw new HttpException("Can't create director", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const directors = await this.directorRepository.find({});
    return directors;
  }

  async findOne(id: string) {
    const director = await this.directorRepository.findOne({ where: { id } });
    if (!director) throw new HttpException('Director not found', 404);
    return director;
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const { affected } = await this.directorRepository.update(
      id,
      updateDirectorDto,
    );

    if (!affected) throw new HttpException('Director not found', 404);
  }

  async remove(id: string) {
    const { affected } = await this.directorRepository.delete(id);
    if (!affected) throw new HttpException('Director not found', 404);
  }
}
