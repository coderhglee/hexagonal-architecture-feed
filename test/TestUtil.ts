import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { sequelizeClientFactory } from '@common/sequelize-client.factory';

export class TestDatabase {
  private readonly database: Sequelize;

  constructor() {
    this.database = sequelizeClientFactory();
  }

  async init(models?: ModelCtor[]) {
    this.database.addModels(models);
    await this.database.sync();
  }

  async clearSchemas() {
    const schemas = await this.database.showAllSchemas({});

    if (schemas.length > 0) {
      await this.database.dropAllSchemas({});
    }
  }

  async close() {
    await this.database.close();
  }
}
