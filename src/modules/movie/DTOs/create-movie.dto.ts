import { Director } from 'src/database/entities/director.entity';

export class CreateMovieDto {
  id: string;

  title: string;

  description: string;

  image: string;

  rating: number;

  director: Director;
}
