import { IDomainEvent } from './domain-event.interface';

export interface IEventPublisher {
  publish(event: IDomainEvent): Promise<void>;

  publishAll(events: IDomainEvent[]): Promise<void>;
}
