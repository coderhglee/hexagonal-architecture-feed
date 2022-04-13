import { Sequelize } from 'sequelize-typescript';

export const sequelizeClientFactory = (): Sequelize => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5430,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  return sequelize;
};
