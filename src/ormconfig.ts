import { DataSource, DataSourceOptions } from 'typeorm'
import { DATABASE_CONNECTION_URL } from './common/configuration'

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  url: DATABASE_CONNECTION_URL,
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
}

export const AppDataSource = new DataSource(ormConfig)

export { ormConfig }
