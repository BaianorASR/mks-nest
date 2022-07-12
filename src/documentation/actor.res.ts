import { Actor } from 'src/database/entities/actor.entity';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class ActorResponse extends PartialType(Actor) {
  @ApiProperty({
    example: '771a0398-8182-4168-a897-d3f0b6091b86',
  })
  id: string;

  @ApiProperty({
    example: 'Will Smith',
  })
  name: string;
}
