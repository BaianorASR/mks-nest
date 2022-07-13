import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  Contains,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Actor } from 'src/database/entities/actor.entity';
import { Category } from 'src/database/entities/category.entity';
import { Director } from 'src/database/entities/director.entity';
import { ActorResponse } from 'src/documentation/actor.res';
import { CategoryResponse } from 'src/documentation/category.res';
import { DirectorResponse } from 'src/documentation/director.res';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Finding Nemo', description: 'movie title' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({
    example:
      'It tells the story of an overprotective clownfish named Marlin who, along with a regal blue tang named Dory, searches for his missing son Nemo.',
    description: 'short description about the movie',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({ example: 2022, description: 'year the movie was released' })
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  releaseYear: number;

  @ApiProperty({ example: 'https://github.com/BaianorASR.png' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Contains('https://')
  image: string;

  @ApiProperty({ example: 4, description: 'number from 1 to 5' })
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ type: DirectorResponse, required: true })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => DirectorResponse)
  director: Director;

  @ApiProperty({ type: [CategoryResponse], required: false })
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories: Category[];

  @ApiProperty({ type: [ActorResponse], required: false })
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => Actor)
  actors!: Actor[];
}
