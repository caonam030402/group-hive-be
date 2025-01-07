import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { RedisConfig } from './redis-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  REDIS_USERNAME: string;

  @IsString()
  REDIS_PASSWORD: string;

  @IsString()
  REDIS_HOST: string;

  @IsString()
  REDIS_PORT: string;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    redisUsername: process.env.REDIS_USERNAME || '',
    redisPassword: process.env.REDIS_PASSWORD || '',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || '6245',
  };
});
