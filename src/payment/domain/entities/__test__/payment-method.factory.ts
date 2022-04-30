import * as faker from 'faker';
import { Factory } from 'rosie';

import { PaymentMethodStatus } from '../payment-method.entity';

import { CardFactory } from './card.factory';

export const PaymentMethodFactory = Factory.define('PaymentMethod').attrs({
  id: () => faker.datatype.uuid(),
  card: () => CardFactory.build({}),
  status: () => PaymentMethodStatus.UNLOCKED,
  createdAt: () => new Date(),
});
