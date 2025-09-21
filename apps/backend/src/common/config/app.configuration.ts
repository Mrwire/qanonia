export interface AppConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  redisUrl: string;
  s3: {
    endpoint: string;
    accessKey: string;
    secretKey: string;
    bucket: string;
    region: string;
  };
}

export const loadAppConfig = (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://qanounia:qanounia@localhost:5432/qanounia',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  s3: {
    endpoint: process.env.S3_ENDPOINT ?? 'http://localhost:9000',
    accessKey: process.env.S3_ACCESS_KEY ?? 'qanounia',
    secretKey: process.env.S3_SECRET_KEY ?? 'qanounia',
    bucket: process.env.S3_BUCKET ?? 'qanounia',
    region: process.env.S3_REGION ?? 'eu-west-1',
  },
});
