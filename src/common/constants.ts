import { extname, join } from 'path'
import {
  HttpStatus, HttpException,
} from '@nestjs/common'
import { Options } from 'multer'

require('dotenv').config()

const DEFAULT_UPLOAD_PATH = join(__dirname, '../../', 'cdn_files') // using ../../ to escape dist/common

const isNewRelicEnabled = Boolean(process.env.USE_NEW_RELIC)
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const UPLOAD_PATH = process.env.UPLOAD_PATH || DEFAULT_UPLOAD_PATH
const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 1024 * 1024 * 10 // 10MB

if (!ACCESS_TOKEN) {
  throw new Error('ACCESS_TOKEN environment variable is not set.\nPlease set it to a random string in your .env file.\nTreat it like a password, this token is used to upload files to your server.')
}

// Multer upload options
const multerOptions: Options = {
  // Enable file size limits
  limits: {
    fileSize: +MAX_FILE_SIZE,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|js)$/)) {
      // Allow storage of file
      cb(null, true)
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.UNPROCESSABLE_ENTITY), false)
    }
  },
}

export {
  ACCESS_TOKEN,
  isNewRelicEnabled,
  multerOptions,
  UPLOAD_PATH,
}
