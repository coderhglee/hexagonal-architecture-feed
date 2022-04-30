import * as faker from 'faker';
import { Factory } from 'rosie';

export const UserFactory = Factory.define('User').attrs({
  id: () => faker.datatype.uuid(),
  name: () => faker.name.firstName(),
  createdAt: () => new Date(),
});
