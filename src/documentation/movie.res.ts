import { Movie } from 'src/database/entities/movie.entity';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { ActorResponse } from './actor.res';
import { CategoryResponse } from './category.res';
import { DirectorResponse } from './director.res';

export class MovieResponse extends PartialType(Movie) {
  @ApiProperty({
    example: '5b55082a-e5f7-45d2-9235-4b2d04c407d3',
  })
  id: string;

  @ApiProperty({ example: 'Finding Nemo', description: 'movie title' })
  title: string;

  @ApiProperty({
    example:
      'It tells the story of an overprotective clownfish named Marlin who, along with a regal blue tang named Dory, searches for his missing son Nemo.',
    description: 'short description about the movie',
  })
  description: string;

  @ApiProperty({ example: 'https://github.com/BaianorASR.png' })
  image: string;

  @ApiProperty({ example: 2022, description: 'year the movie was released' })
  releaseYear: number;

  @ApiProperty({ example: 4, description: 'number from 1 to 5' })
  rating: number;

  @ApiProperty({ type: DirectorResponse, required: true })
  director: DirectorResponse;

  @ApiProperty({ type: [CategoryResponse], required: false })
  categories: CategoryResponse[];

  @ApiProperty({ type: [ActorResponse], required: false })
  actors: ActorResponse[];
}
