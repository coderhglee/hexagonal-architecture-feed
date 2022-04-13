import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
