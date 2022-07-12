import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateActorDto } from './create-actor.dto';

export class UpdateActorDto extends PartialType(CreateActorDto) {
  @ApiProperty({
    example: 'Leonardo Dicapri',
    description: 'name is required to update a actor',
  })
  name: string;
}
