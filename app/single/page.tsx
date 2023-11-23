import "../../public/css/single.scss";
import "../../public/css/dialog.scss";
import { headers } from "next/headers";
import Single from "../../components/single";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export type IframeStatus = {
  width: number;
  height: number;
  isObstacle: boolean; // 背面に隠れる
  scale?: number;
};

// GETメソッド
export const fetchOriginData = async (
  id: string
): Promise<{
  success: boolean;
  data: { first: number; favorites: number[] };
}> => {
  const headersData = headers();
  const host = headersData.get("host");
  const protocol =
    headersData.get("x-forwarded-proto") ?? host?.includes("localhost")
      ? "http"
      : "https";
  const apiBase = `${protocol}://${host}`;
  const res = await fetch(`${apiBase}/api/users/${id}`);
  return await res.json();
};

// ----------------ここからページ[SSR]
const Home = async () => {
  // ログイン情報を取得
  const session = await getServerSession(authOptions);

  // 初期情報[最初に表示する番号、お気に入りリスト]を格納
  const initData = session?.user?.name
    ? (await fetchOriginData(session?.user?.name)).data
    : { first: 20216050, favorites: [] };

  return <Single initData={initData} />;
};
export default Home;
