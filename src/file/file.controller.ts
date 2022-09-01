import {
  Controller, Post, UseInterceptors, UploadedFile, Delete, Body, HttpCode, Get, Param,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'

import { FileUploadDTO } from './dto/file-upload.dto'
import { FileDeleteDTO } from './dto/file-delete.dto'
import { multerOptions } from '../common/constants'
import { FileService } from './file.service'

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Get('/:id')
  getFile(@Param('id') id: string) {
    return this.fileService.getFile(id)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadDTO) {
    const { token } = body
    this.fileService.verifyAuth(token)
    return await this.fileService.saveFile(file)
  }

  @Delete()
  @HttpCode(204)
  async deleteFile(@Body() body: FileDeleteDTO) {
    const { token, filename } = body
    this.fileService.verifyAuth(token)
    await this.fileService.deleteFile(filename)
  }
}
