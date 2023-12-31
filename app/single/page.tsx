import '../../public/css/single.scss';
import '../../public/css/dialog.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOption';
import { ENVIROMENT_KEY } from '../../features/environmentKey';
import SingleProvider from './singleProvider';

// GETメソッド
const fetchOriginData = async (
  id: string
): Promise<{
  success: boolean;
  data: { first: number; favorites: number[]; isLocalStorage: boolean };
}> => {
  const res = await fetch(`${ENVIROMENT_KEY.BASE_URL}/api/users/${id}`);
  return await res.json();
};

// ----------------ここからページ[SSR]
const Home = async () => {
  // ログイン情報を取得
  const session = await getServerSession(authOptions);

  // 初期情報[最初に表示する番号、お気に入りリスト]を格納
  const initData = session?.user?.email
    ? (await fetchOriginData(session?.user?.email)).data
    : { first: 20216050, favorites: [], isLocalStorage: true };
  // const initData = { first: 20216050, favorites: [], isLocalStorage: true };

  return <SingleProvider initData={initData} />;
};
export default Home;
