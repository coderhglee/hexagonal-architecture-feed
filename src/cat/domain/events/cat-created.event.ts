import { IDomainEvent } from '../../../common/domain-event.interface';
import { Cat } from '../entities/cat.entity';

export class CatCreatedEvent implements IDomainEvent {
  constructor(readonly cat: Cat) {}
}
