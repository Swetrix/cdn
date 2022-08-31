import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor() {}
}
