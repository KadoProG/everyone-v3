import { initStudentNo } from '@/const';

type LocalStrage = {
  favorites: number[];
  first: number | null;
};

export const localStrage = {
  $KEY: 'everyone_v3_favorite_data',
  $get: function (): LocalStrage {
    if (typeof window === 'undefined') {
      return { favorites: [], first: null };
    }
    const res = localStorage.getItem(this.$KEY);
    if (!res) return { favorites: [], first: null };
    const result = JSON.parse(res);
    return result;
  },

  getFavorites: function (): number[] {
    const res = this.$get();
    return res.favorites;
  },

  getFirst: function (): number | null {
    const res = this.$get();
    return res.first;
  },

  setFavorites: function (favorites: number[]): void {
    const data = this.$get();
    data.favorites = favorites;
    localStorage.setItem(this.$KEY, JSON.stringify(data));
  },

  setFirst: function (first: number | null): void {
    const data = this.$get();
    data.first = first;
    localStorage.setItem(this.$KEY, JSON.stringify(data));
  },
};

// GETメソッド
const fetchOriginData = async (
  id: string
): Promise<{
  success: boolean;
  data: { first: number; favorites: number[]; isLocalStorage: boolean };
}> => {
  const res = await fetch(`/api/users/${id}`);
  return await res.json();
};

// LocalのデータとGitのデータを比較し、メッセージを返す
export const gitFetchDifference = async (
  id: string
): Promise<{
  arrMessage: string[];
  localData: number[];
  allData: number[];
  gitData: number[];
  localFirst: number;
  gitFirst: number;
}> => {
  const localFavorites = localStrage.getFavorites();
  // ローカルストレージとGitデータの競合問題を解決する
  const result = (await fetchOriginData(id)).data;

  // 全てのデータ
  // setを使う
  const allData_0 = [...new Set([...result.favorites, ...localFavorites])];
  const allData = allData_0.sort((a, b) => a - b);

  // 共通データ
  const sameData = result.favorites.filter((v) => localFavorites.includes(v));
  if (sameData.length > 10) {
    sameData.length = 10;
    sameData.push(NaN);
  }
  // Gitにしかないデータ
  const gitOnlyData = result.favorites.filter(
    (v) => !localFavorites.includes(v)
  );
  if (gitOnlyData.length > 10) {
    gitOnlyData.length = 10;
    gitOnlyData.push(NaN);
  }

  // ローカルにしかないデータ
  const localData = localFavorites.filter((v) => !result.favorites.includes(v));
  if (localData.length > 10) {
    localData.length = 10;
    localData.push(NaN);
  }

  return {
    arrMessage: [
      'ローカルストレージとGitデータを統合しますか？',
      `共通: ${sameData.join(', ').replace('NaN', '他')}`,
      `Localのみ: ${localData.join(', ').replace('NaN', '他')}`,
      `Gitのみ: ${gitOnlyData.join(', ').replace('NaN', '他')}`,
      `最初に表示: [Local ${localStrage.getFirst()}] [Git ${result.first}]`,
    ],
    allData,
    localData: localFavorites,
    gitData: result.favorites,
    localFirst: localStrage.getFirst() || initStudentNo,
    gitFirst: result.first,
  };
};
