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
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { DirectorService } from '../service/director.service';
import { CreateDirectorDto } from '../DTOs/create-director.dto';
import { UpdateDirectorDto } from '../DTOs/update-director.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DirectorResponse } from 'src/documentation/director.res';

@ApiTags('directors')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all Directors',
    description: 'Return array of all actors in the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [DirectorResponse],
    description: 'Found Directors',
  })
  async findAll() {
    return this.directorService.findAll();
  }

  // ###################################

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new Director',
    description: 'Catch the name and save new Director',
  })
  @ApiBody({ type: CreateDirectorDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DirectorResponse,
    description: 'Created Director',
  })
  async create(@Body() createActorDto: CreateDirectorDto) {
    return this.directorService.create(createActorDto);
  }

  // ###################################

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search Director with name contain the query',
    description: 'Find the Director with target id',
  })
  @ApiQuery({
    name: 'q',
    description: 'Director name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Director found',
    type: [DirectorResponse],
  })
  async findByName(@Query('q') name: string) {
    return this.directorService.findByName(name);
  }

  // ###################################

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Director by id',
    description: 'Find the Director with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Director',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Director found',
    type: DirectorResponse,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.directorService.findOne(id);
  }

  // ###################################

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update Director by id',
    description: 'Update the Director with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Director',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(id, updateDirectorDto);
  }

  // ###################################

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Director by id',
    description: 'Director with target id will be deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Director',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.directorService.remove(id);
  }
}
