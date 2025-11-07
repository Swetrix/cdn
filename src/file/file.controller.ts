import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
  HttpCode,
  Get,
  Param,
  UploadedFiles,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'

import { FileUploadDTO } from './dto/file-upload.dto'
import { FileDeleteDTO } from './dto/file-delete.dto'
import { multerOptions } from '../common/constants'
import { FileService } from './file.service'
import { FilesUploadDTO } from './dto/files-upload.dto'

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:id')
  getFile(@Param('id') id: string) {
    return this.fileService.getFile(id)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileUploadDTO,
  ) {
    const { token } = body
    this.fileService.verifyAuth(token)
    return await this.fileService.saveFile(file)
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 7, multerOptions))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: FilesUploadDTO,
  ) {
    const { token } = body
    this.fileService.verifyAuth(token)
    return await this.fileService.saveMultipleFiles(files)
  }

  @Delete()
  @HttpCode(204)
  async deleteFile(@Body() body: FileDeleteDTO) {
    const { token, filename } = body
    this.fileService.verifyAuth(token)
    await this.fileService.deleteFile(filename)
  }
}
