import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Movie } from './movie.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies: Movie[];
}
