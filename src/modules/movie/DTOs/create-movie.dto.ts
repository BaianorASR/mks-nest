import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  Contains,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Actor } from 'src/database/entities/actor.entity';
import { Category } from 'src/database/entities/category.entity';
import { Director } from 'src/database/entities/director.entity';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @IsInt()
  @IsNotEmpty()
  releaseYear: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Contains('https://')
  image: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsUUID()
  director: Director;

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories: Category[];

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => Actor)
  actors: Actor[];
}
