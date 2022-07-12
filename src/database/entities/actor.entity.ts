import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Movie } from './movie.entity';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
