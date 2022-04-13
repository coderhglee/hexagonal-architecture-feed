import { Sequelize } from 'sequelize-typescript';

import { CatModel } from '../src/cat/persistence/models/cat/cat.model';

import { sequelizeClientFactory } from '../src/common/sequelize-client.factory';

export class TestDatabase {
  private readonly database: Sequelize;

  constructor() {
    this.database = sequelizeClientFactory();
  }

  async init() {
    this.database.addModels([CatModel]);
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
