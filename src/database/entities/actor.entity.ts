import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('actors')
export class Actor {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
