import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Actor } from './actor.entity';
import { Category } from './category.entity';
import { Director } from './director.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  @Column()
  description: string;

  @Column('time', { name: 'release_date', default: '2022' })
  releaseDate: Date;

  @Column()
  image: string;

  @Column()
  rating: number;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToMany(() => Category, (category) => category.movies)
  categories: Category[];

  @ManyToMany(() => Actor, (actor) => actor.movies)
  actors: Actor[];
}
