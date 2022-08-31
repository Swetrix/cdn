import { Logger } from '@nestjs/common'

export class AppLoggerService extends Logger {
  log(value, route, forceLog = false) {
    if (process.env.NODE_ENV === 'development' || forceLog) {
      Logger.log(value, route)
    }
  }
}
