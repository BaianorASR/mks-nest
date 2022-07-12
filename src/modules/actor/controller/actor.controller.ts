import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActorService } from '../service/actor.service';
import { CreateActorDto } from '../DTOs/create-actor.dto';
import { UpdateActorDto } from '../DTOs/update-actor.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActorResponse } from 'src/documentation/actor.res';

@ApiTags('actors')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all Actors',
    description: 'Return array of all actors in the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ActorResponse],
    description: 'Found Actors',
  })
  async findAll() {
    return this.actorService.findAll();
  }

  // ###################################

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new Actor',
    description: 'Catch the name and save new Actor',
  })
  @ApiBody({ type: CreateActorDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ActorResponse,
    description: 'Created Actor',
  })
  async create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  // ###################################

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search Actor with name contain the query',
    description: 'Find the Actor with target id',
  })
  @ApiQuery({
    name: 'q',
    description: 'Actor name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor found',
    type: [ActorResponse],
  })
  async findByName(@Query('q') name: string) {
    return this.actorService.findByName(name);
  }

  // ###################################

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Actor by id',
    description: 'Find the Actor with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Actor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actor found',
    type: ActorResponse,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.actorService.findOne(id);
  }

  // ###################################

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update Actor by id',
    description: 'Update the Actor with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Actor',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorService.update(id, updateActorDto);
  }

  // ###################################

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Actor by id',
    description: 'Actor with target id will be deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Actor',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.actorService.remove(id);
  }
}
