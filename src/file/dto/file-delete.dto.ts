import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class FileDeleteDTO {
  @ApiProperty({
    example: 'access_token',
    required: true,
    description: 'CDN Access token',
  })
  @IsNotEmpty()
  token: string

  @ApiProperty({
    example: 'd4c60dd4112d4cd9c75ab103f6b7a67d.png',
    required: true,
    description: 'Filename you want to delete',
  })
  filename: string
}
