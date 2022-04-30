import * as faker from 'faker';
import { Factory } from 'rosie';

export const CardFactory = Factory.define('Card').attrs({
  creditNumber: () => faker.finance.creditCardNumber(),
  cvc: () => faker.finance.creditCardCVV(),
  expiredMonth: () => new Date(),
  expireYear: () => new Date(),
});
