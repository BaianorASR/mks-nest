import { Director } from 'src/database/entities/director.entity';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class DirectorResponse extends PartialType(Director) {
  @ApiProperty({
    example: '771a0398-8182-4168-a897-d3f0b6091b86',
  })
  id: string;

  @ApiProperty({
    example: 'Quentin Tarantino',
  })
  name: string;
}
