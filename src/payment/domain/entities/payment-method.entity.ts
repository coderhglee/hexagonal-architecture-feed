import { Card } from './card.vo';

export enum PaymentMethodStatus {
  LOCKED = 'locked',
  UNLOCKED = 'unlocked',
}

export class PaymentMethod {
  id: string;

  card: Card;

  status: PaymentMethodStatus;

  createdAt: Date;

  constructor(
    id: string,
    card: Card,
    status: PaymentMethodStatus,
    createdAt: Date,
  ) {
    this.id = id;
    this.card = card;
    this.status = status;
    this.createdAt = createdAt;
  }

  lock() {
    if (this.status === PaymentMethodStatus.LOCKED) {
      throw new Error();
    }

    this.status = PaymentMethodStatus.LOCKED;
  }

  unlock() {
    if (this.status === PaymentMethodStatus.UNLOCKED) {
      throw new Error();
    }

    this.status = PaymentMethodStatus.UNLOCKED;
  }
}
