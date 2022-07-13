import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column('varchar')
  description: string;

  @Column('int', { name: 'release_year' })
  releaseYear: number;

  @Column('varchar')
  image: string;

  @Column('int2')
  rating: number;

  @ManyToOne(() => Director, director => director, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'movies_categories',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'id',
    },
  })
  categories: Category[];

  @ManyToMany(() => Actor, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'movies_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'id',
    },
  })
  actors: Actor[];
}
