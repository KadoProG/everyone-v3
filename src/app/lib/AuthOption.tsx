import GithubProvider from 'next-auth/providers/github';
import { ENVIROMENT_KEY } from '../../utils/environmentKey';

export const authOptions = {
  secret: ENVIROMENT_KEY.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: ENVIROMENT_KEY.GITHUB_CLIENT_ID,
      clientSecret: ENVIROMENT_KEY.GITHUB_CLIENT_SECRET,
    }),
  ],
};
