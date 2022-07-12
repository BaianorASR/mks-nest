import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie)
      throw new HttpException('Movie nor found', HttpStatus.NOT_FOUND);

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string) {
    return `This action removes a #${id} movie`;
  }
}
