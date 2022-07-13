import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Drama',
    description: 'The name is required to create a category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
