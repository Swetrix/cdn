import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FileModule } from './file/file.module'
import { PingModule } from './ping/ping.module'

const modules = [
  ConfigModule.forRoot({ envFilePath: '.env' }),
  FileModule,
  PingModule,
]

@Module({
  imports: modules,
})
export class AppModule {}
