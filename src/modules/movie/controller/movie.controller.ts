import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  HttpCode,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { CreateMovieDto } from '../DTOs/create-movie.dto';
import { UpdateMovieDto } from '../DTOs/update-movie.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FilterMovieDto } from '../DTOs/filter-movie.dto';
import { MovieResponse } from 'src/documentation/movie.res';

@ApiTags('movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all Movie',
    description: 'Return array of all actors in the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MovieResponse],
    description: 'Found Movie',
  })
  async findAll() {
    return this.movieService.findAll();
  }

  // ###################################

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new Movie',
    description: 'Catch the name and save new Movie',
  })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MovieResponse,
    description: 'Created Movie',
  })
  async create(@Body() createActorDto: CreateMovieDto) {
    return this.movieService.create(createActorDto);
  }

  // ###################################

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search Movie with name contain the query',
    description: 'Find the Movie with target id',
  })
  @ApiQuery({
    name: 'q',
    description: 'Movie name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found',
    type: [MovieResponse],
  })
  async findByName(@Query('q') name: string) {
    return this.movieService.findByName(name);
  }

  // ###################################

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Filter Movie',
    description:
      'Find the Movie by year, director, actor and category, !! ONLY ONE QUERY CAN BE PASSED !!',
  })
  @ApiQuery({
    name: 'year',
    description: 'released year',
    example: '2022',
  })
  @ApiQuery({
    name: 'director',
    description: 'director name',
    example: 'Quentin Tarantino',
  })
  @ApiQuery({
    name: 'actor',
    description: 'actor name',
    example: 'Will Smith',
  })
  @ApiQuery({
    name: 'category',
    description: 'category name',
    example: 'Thriller',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found',
    type: [MovieResponse],
  })
  filter(@Req() request: Request<null, null, null, FilterMovieDto>) {
    const queries = request.query;
    const filteredMovie = this.movieService.filter(queries);

    return filteredMovie;
  }

  // ###################################

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Movie by id',
    description: 'Find the Movie with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Movie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found',
    type: MovieResponse,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.findOne(id);
  }

  // ###################################

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update Movie by id',
    description: 'Update the Movie with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Movie',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  // ###################################

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Movie by id',
    description: 'Movie with target id will be deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Movie',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movieService.remove(id);
  }
}
