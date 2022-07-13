import { Actor } from 'src/database/entities/actor.entity';
import { Category } from 'src/database/entities/category.entity';
import { Director } from 'src/database/entities/director.entity';
import { Movie } from 'src/database/entities/movie.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './controller/movie.controller';
import { MovieService } from './service/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
