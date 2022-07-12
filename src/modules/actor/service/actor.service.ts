import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/actor.entity';
import { Repository, Like } from 'typeorm';

import { CreateActorDto } from '../DTOs/create-actor.dto';
import { UpdateActorDto } from '../DTOs/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async create(createActorDto: CreateActorDto) {
    const actorCreated = await this.actorRepository.save(createActorDto);
    return actorCreated;
  }

  async findAll() {
    const actors = await this.actorRepository.find();
    return actors;
  }

  async findOne(id: string) {
    const actor = await this.actorRepository.findOne({ where: { id } });

    if (!actor)
      throw new HttpException('Actor not found', HttpStatus.NOT_FOUND);

    return actor;
  }

  async findByName(name: string) {
    const actor = await this.actorRepository.findOne({
      where: { name: Like(`%${name}%`) },
    });

    if (!actor)
      throw new HttpException('Actor not found', HttpStatus.NOT_FOUND);

    return actor;
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    const { affected } = await this.actorRepository.update(id, updateActorDto);
    if (!affected)
      throw new HttpException('Actor not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const { affected } = await this.actorRepository.delete(id);
    if (!affected)
      throw new HttpException('Actor not found', HttpStatus.NOT_FOUND);
  }
}
