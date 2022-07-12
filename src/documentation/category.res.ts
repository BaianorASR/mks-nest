import { Category } from 'src/database/entities/category.entity';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CategoryResponse extends PartialType(Category) {
  @ApiProperty({
    example: '771a0398-8182-4168-a897-d3f0b6091b86',
  })
  id: string;

  @ApiProperty({
    example: 'Drama',
  })
  name: string;
}
