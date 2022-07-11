import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
