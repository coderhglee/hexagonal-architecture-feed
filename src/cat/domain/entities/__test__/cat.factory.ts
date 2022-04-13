import * as faker from 'faker';
import { Factory } from 'rosie';

export const CatFactory = Factory.define('Cat').attrs({
  id: () => faker.datatype.uuid(),
  name: () => faker.name.firstName(),
  age: () => faker.datatype.number(),
  breed: () => faker.address.cityName(),
});
