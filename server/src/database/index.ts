import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '@config';

const sequelize = new Sequelize({
  ...(dbConfig as any),
  models: [__dirname + '/../models/*.model.ts'],
});

sequelize.authenticate();

export default sequelize;
