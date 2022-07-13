import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDirectorDto {
  @ApiProperty({
    example: 'Quentin Tarantino',
    description: 'The name is required to create a director',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
