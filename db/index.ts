// db:装数据库相关的实体
// index里需要写typeorm的入口文件,需要导出数据的xx函数

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users, User_auths } from './entity/index';

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

export const prepareConnection = async () => {
  const AppDataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [Users, User_auths], //关于数据库的映射关系
    synchronize: false,
    logging: true,
  });

  return AppDataSource.initialize()
};