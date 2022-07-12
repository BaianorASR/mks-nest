import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/database/entities/movie.entity';
import { Repository } from 'typeorm';

import { CreateMovieDto } from '../DTOs/create-movie.dto';
import { UpdateMovieDto } from '../DTOs/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findAll() {
    return this.movieRepository.find({
      relations: ['director'],
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
