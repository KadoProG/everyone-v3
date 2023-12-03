if (
  !process.env.BASE_URL ||
  !process.env.NEXTAUTH_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET
) {
  throw new Error('環境変数が設定されていません');
}

export const ENVIROMENT_KEY = {
  BASE_URL: process.env.BASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
} as const;
