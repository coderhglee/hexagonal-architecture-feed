import * as faker from 'faker';
import { Factory } from 'rosie';

import { PaymentIntentStatus } from '@payment/domain/entities/payment-intent.entity';

export const PaymentIntentFactory = Factory.define('PaymentIntent').attrs({
  id: () => faker.datatype.uuid(),
  status: PaymentIntentStatus.REQURIED,
  customerId: () => faker.datatype.uuid(),
  mercantId: () => faker.datatype.uuid(),
  methodId: () => faker.datatype.uuid(),
  installments: () => faker.datatype.number(12),
  amount: () => faker.datatype.number(Number.MAX_SAFE_INTEGER),
  tax: () => faker.datatype.number(Number.MAX_SAFE_INTEGER),
});
