import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EventPublisher } from '../common/message/event-publisher';
import { sequelizeClientFactory } from '../common/sequelize-client.factory';

import { CatCreatedHandler } from './application/events/cat-created.handler';

import { CatService } from './domain/service/cat.service';
import { CatModel } from './persistence/models/cat.model';
import { CatsRepository } from './persistence/repository/cat.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: 'CatModel',
      useValue: CatModel,
    },
    {
      provide: 'ICatsRepository',
      useClass: CatsRepository,
    },
    {
      provide: 'ICatService',
      useClass: CatService,
    },
    {
      provide: 'IEventPublisher',
      useClass: EventPublisher,
    },
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = sequelizeClientFactory();

        sequelize.addModels([CatModel]);

        await sequelize.sync();

        return sequelize;
      },
    },
    CatCreatedHandler,
  ],
  exports: ['ICatService'],
})
export class CatModule {}
