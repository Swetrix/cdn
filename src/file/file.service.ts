import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common'
import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { promises as fs } from 'fs'
import * as crypto from 'crypto'

import { ACCESS_TOKEN, UPLOAD_PATH } from '../common/constants'

@Injectable()
export class FileService {
  constructor() {}

  verifyAuth(token: string) {
    if (token !== ACCESS_TOKEN) {
      // TODO: Add rate limiting
      throw new UnauthorizedException('Invalid access token')
    }
  }

  async saveFile(file: Express.Multer.File) {
    const id = crypto.randomBytes(16).toString('hex')
    const filename = `${id}${extname(file.originalname)}`
    const path = `${UPLOAD_PATH}/${filename}`

    if (!existsSync(UPLOAD_PATH)) {
      mkdirSync(UPLOAD_PATH)
    }

    try {
      await fs.writeFile(path, file.buffer, 'binary')
    } catch (e) {
      throw new InternalServerErrorException('An error happened while saving the file')
    }

    return {
      filename,
    }
  }

  async deleteFile(filename) {
    const path = `${UPLOAD_PATH}/${filename}`

    try {
      await fs.unlink(path)
    } catch (e) {
      throw new InternalServerErrorException('An error happened while removing the file')
    }
  }
}
