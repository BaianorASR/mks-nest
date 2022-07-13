import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty({
    example: 'Will Smith',
    description: 'The name is required to create a actor',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
