import { ApiProperty, PickType } from '@nestjs/swagger';

import { CreateDirectorDto } from './create-director.dto';

export class UpdateDirectorDto extends PickType(CreateDirectorDto, ['name']) {
  @ApiProperty({
    example: 'Tim Button',
    description: 'name is required to update a director',
  })
  name: string;
}
