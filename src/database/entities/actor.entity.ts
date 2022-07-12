import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Movie } from './movie.entity';

@Entity('actors')
export class Actor {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, movie => movie.actors)
  movies: Movie[];
}
