import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { IDomainEvent } from '../domain-event.interface';
import { IEventPublisher } from '../event-publisher.interface';

@Injectable()
export class EventPublisher implements IEventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  async publish(event: IDomainEvent): Promise<void> {
    this.eventBus.publish(event);
  }

  async publishAll(events: IDomainEvent[]): Promise<void> {
    this.eventBus.publishAll(events);
  }
}
