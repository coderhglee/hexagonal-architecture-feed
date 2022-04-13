import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CatCreatedEvent } from '../../domain/events/cat-created.event';

@EventsHandler(CatCreatedEvent)
export class CatCreatedHandler implements IEventHandler<CatCreatedEvent> {
  async handle(event: CatCreatedEvent): Promise<void> {
    console.log('hi');
    console.log(event);
  }
}
