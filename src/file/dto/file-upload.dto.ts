import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ProjectDTO {
  @ApiProperty({
    example: 'blah',
    required: false,
    description: 'Optional filename',
  })
  @IsNotEmpty()
  name: string
}
