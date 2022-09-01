import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class FileUploadDTO {
  @ApiProperty({
    example: 'access_token',
    required: true,
    description: 'CDN Access token',
  })
  @IsNotEmpty()
  token: string

  @ApiProperty()
  file: Express.Multer.File
}
