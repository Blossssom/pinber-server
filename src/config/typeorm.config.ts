import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const env = configService.get('NODE_ENV') as string;

  if (!['dev', 'prod'].includes(env)) {
    throw new Error(`Invalid NODE_ENV: ${env}`);
  }

  const sync = configService.get('SYNCHRONIZE') === 'true' ? true : false;
  const logging = configService.get('LOGGING') === 'true' ? true : false;
  const DB_TYPE: 'postgres' = 'postgres' as const;

  const options: TypeOrmModuleOptions = {
    type: DB_TYPE,
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: String(configService.get('DATABASE_PASSWORD')),
    database: configService.get('DATABASE_NAME'),
    autoLoadEntities: true,
    synchronize: env === 'production' ? false : sync,
    useUTC: false,
    logging: env === 'production' ? false : logging,
    retryAttempts: env === 'production' ? 10 : 3,
  };

  return options;
};
