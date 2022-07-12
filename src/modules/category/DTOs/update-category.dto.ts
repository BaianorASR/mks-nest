import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    example: 'Thriller',
    description: 'name is required to update a category',
  })
  name: string;
}
