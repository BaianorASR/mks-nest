import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/actor.entity';
import { Category } from 'src/database/entities/category.entity';
import { Director } from 'src/database/entities/director.entity';
import { Movie } from 'src/database/entities/movie.entity';
import { Like, Repository } from 'typeorm';

import { CreateMovieDto } from '../DTOs/create-movie.dto';
import { FilterMovieDto } from '../DTOs/filter-movie.dto';
import { UpdateMovieDto } from '../DTOs/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const createdMovie = await this.movieRepository.save(createMovieDto);
    return createdMovie;
  }

  async findAll() {
    const foundMovie = await this.movieRepository.find({
      relations: {
        director: true,
        actors: true,
        categories: true,
      },
    });

    return foundMovie;
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie)
      throw new HttpException('Movie nor found', HttpStatus.NOT_FOUND);

    return movie;
  }

  async findByName(name: string) {
    const movie = await this.movieRepository.findOne({
      where: { title: Like(`%${name}%`) },
    });

    if (!movie)
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const { affected } = await this.movieRepository.update(id, updateMovieDto);

    if (!affected)
      throw new HttpException('Movie not exists', HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const { affected } = await this.movieRepository.delete(id);

    if (!affected)
      throw new HttpException('Movie not exists', HttpStatus.BAD_REQUEST);
  }

  async filter(queries: FilterMovieDto) {
    const queriesArray = Object.keys(queries);
    if (!queriesArray || queriesArray.length === 0) {
      throw new BadRequestException('please send a query');
    }

    if (queriesArray.length > 1) {
      throw new BadRequestException('only one query at a time');
    }

    const { year, actor, director, category } = queries;

    const movie = await this.movieRepository
      .createQueryBuilder('MOVIES')
      .leftJoinAndSelect('MOVIES.categories', 'CATEGORY')
      .leftJoinAndSelect('MOVIES.actors', 'ACTOR')
      .leftJoinAndSelect('MOVIES.director', 'DIRECTOR')
      .orWhere('MOVIES.release_year = :year', { year })
      .orWhere('CATEGORY.name = :category', { category })
      .orWhere('ACTOR.name = :actor', { actor })
      .orWhere('DIRECTOR.name = :director', { director })
      .getMany();

    return movie;
  }
}
