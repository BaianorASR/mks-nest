import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../DTOs/create-category.dto';
import { UpdateCategoryDto } from '../DTOs/update-category.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryResponse } from 'src/documentation/category.res';
import { ValidationPipe } from 'src/pipes/validation.pipe';
@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all Categories',
    description: 'Return array of all actors in the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CategoryResponse],
    description: 'Found Categories',
  })
  async findAll() {
    return this.categoryService.findAll();
  }

  // ###################################

  @Post()
  @UsePipes()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new Category',
    description: 'Catch the name and save new Category',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CategoryResponse,
    description: 'Created Category',
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  // ###################################

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search Category with name contain the query',
    description: 'Find the Category with target id',
  })
  @ApiQuery({
    name: 'q',
    description: 'Category name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category found',
    type: [CategoryResponse],
  })
  async findByName(@Query('q') name: string) {
    return this.categoryService.findByName(name);
  }

  // ###################################

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Category by id',
    description: 'Find the Category with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category found',
    type: CategoryResponse,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoryService.findOne(id);
  }

  // ###################################

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update Category by id',
    description: 'Update the Category with target id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Category',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  // ###################################

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Category by id',
    description: 'Category with target id will be deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Id(uuid) of an Category',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoryService.remove(id);
  }
}
