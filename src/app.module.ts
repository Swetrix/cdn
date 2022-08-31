import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { FileModule } from './file/file.module'
import { TaskManagerModule } from './task-manager/task-manager.module'
import { PingModule } from './ping/ping.module'

const modules = [
  ConfigModule.forRoot({ envFilePath: '.env' }),
  ScheduleModule.forRoot(),
  TaskManagerModule,
  FileModule,
  PingModule,
]

@Module({
  imports: modules,
})
export class AppModule {}
