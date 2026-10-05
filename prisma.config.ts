import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

config({ quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // マイグレーションはコネクションプーラーを経由しない URL で実行する
    url: process.env.POSTGRES_URL_NON_POOLING,
  },
});
