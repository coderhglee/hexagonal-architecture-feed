import { resolve } from 'path';

import { config } from 'dotenv';

import { sequelizeClientFactory } from '../src/common/sequelize-client.factory';

config({ path: resolve(process.cwd(), '.env.test') });

afterAll(async () => {
  const db = sequelizeClientFactory();

  await db.sync();

  const schemas = await db.showAllSchemas({});

  console.log(schemas);
  // if (schemas.length > 0) {
  // }
  console.log('clear');
  await db.dropAllSchemas({});

  await db.close();
});
