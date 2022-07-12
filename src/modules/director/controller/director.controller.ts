import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DirectorService } from '../service/director.service';
import { CreateDirectorDto } from '../DTOs/create-director.dto';
import { UpdateDirectorDto } from '../DTOs/update-director.dto';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    createDirectorDto: CreateDirectorDto,
  ) {
    const director = await this.directorService.create(createDirectorDto);
    return director;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const directors = await this.directorService.findAll();
    return directors;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: string,
  ) {
    const director = await this.directorService.findOne(id);
    return director;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id')
    id: string,
    @Body()
    updateDirectorDto: UpdateDirectorDto,
  ) {
    await this.directorService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id')
    id: string,
  ) {
    await this.directorService.remove(id);
  }
}
