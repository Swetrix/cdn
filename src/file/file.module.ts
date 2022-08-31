import { Module } from '@nestjs/common'

import { FileService } from './file.service'
import { FileController } from './file.controller'

@Module({
  imports: [],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
