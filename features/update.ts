// 学生番号を返す
export const changeStudentNo = (year: number, no: number): number => {
  const strNo = no < 0 ? ('000' + 1).slice(-3) : ('000' + no).slice(-3);
  const numYear = year < 2020 ? ('00' + (year - 1988)).slice(-2) : year;

  return parseInt(numYear + '6' + strNo);
};

// 年度と番号を返す
export const changeYearNo = (
  studentNo: number
): { year: number; no: number } => {
  const strNo = String(studentNo).slice(-3); // 下3桁
  const no = isNaN(parseInt(strNo)) ? 0 : parseInt(strNo);

  const strYear = String(studentNo).slice(0, -4); // 上2~4桁(下4桁を除く数)

  const numYear = isNaN(parseInt(strYear)) ? 0 : parseInt(strYear);
  const year = strYear.length <= 2 ? numYear + 1988 : numYear;

  return { year: year, no: no };
};

type PracData = {
  title: string;
  mini: string;
  pracs: { name: string; path: string }[];
  makeUrl(year: number, no: number, index: number): string;
};
export const pracData: PracData[] = [
  {
    title: 'Webコンテンツ及び演習',
    mini: 'Webｺﾝﾃﾝﾂ',
    pracs: [
      { name: 'INDEX', path: '' },
      { name: '課題01', path: 'EX01.html' },
      { name: '課題02', path: 'EX02.html' },
      { name: '課題03', path: 'EX03.html' },
      { name: '課題04', path: 'EX04.html' },
      { name: '課題05', path: 'EX05.html' },
      { name: '課題06', path: 'EX06.html' },
      { name: '課題07', path: 'EX07.html' },
      { name: '課題08', path: 'EX08.html' },
      { name: '課題09', path: 'EX09.html' },
      { name: '課題10', path: 'EX10.html' },
      { name: '課題11', path: 'EX11.html' },
      { name: '課題12', path: 'EX12.html' },
      { name: '課題13', path: 'EX13.html' },
      { name: '課題14', path: 'EX14.html' },
    ],
    makeUrl: function (year, no, index) {
      const strYear =
        year < 2020
          ? 'h' + ('00' + (year - 1988)).slice(-2)
          : 'r' + ('00' + (year - 2018)).slice(-2);

      const url_0 = 'https://www.cse.ce.nihon-u.ac.jp/webcon/' + strYear; // 年度 r03 h31
      const url_1 = url_0 + '/u' + changeStudentNo(year, no) + '/'; // 学生番号
      const url_2 = url_1 + this.pracs[index].path; // 課題番号

      return url_2;
    },
  },
  {
    title: 'WWWとJava及び演習',
    mini: 'Java',
    pracs: [
      { name: 'INDEX', path: '' },
      { name: '口座開設', path: 'open' },
      { name: '口座解約', path: 'close' },
      { name: '貯金', path: 'deposit' },
      { name: '引き出し', path: 'withdraw' },
      { name: '残高照会', path: 'balance' },
      { name: '車のやつ', path: 'shop.html' },
      { name: '車購入', path: 'carshop?cars=サンプル車' },
      { name: '口座開設(100,107)', path: 'bank?command=open&name=ユーザ１' },
    ],
    makeUrl: function (year, no, index) {
      const strYear = 'java' + (year + 1) + 'f';
      const url_0 = 'https://java.cse.ce.nihon-u.ac.jp/' + strYear; // 年度 java2022f
      const url_1 = url_0 + '/u' + changeStudentNo(year, no) + '/'; // 学生番号
      const url_2 = url_1 + this.pracs[index].path; // 課題番号

      return url_2;
    },
  },
  {
    title: 'マルチメディア',
    mini: 'ﾏﾙｳｪｱ',
    pracs: [
      { name: '課題04', path: 'mulmedia/ex_04/' },
      { name: '課題05', path: 'mulmedia/ex_05/' },
      { name: '課題06', path: 'mulmedia/ex_06/' },
      { name: '課題07', path: 'mulmedia/ex_07/' },
      { name: '課題08', path: 'mulmedia/ex_08/' },
      { name: '課題09', path: 'mulmedia/ex_09/' },
      { name: '課題10', path: 'mulmedia/ex_10/' },
      { name: '課題11', path: 'mulmedia/ex_11/' },
      { name: '課題12', path: 'mulmedia/ex_12/' },
      { name: '課題13', path: 'mulmedia/ex_13/' },
      { name: '課題14', path: 'mulmedia/ex_14/' },
    ],
    makeUrl: function (year, no, index) {
      const strYear =
        year < 2020
          ? 'h' + ('00' + (year - 1988)).slice(-2)
          : 'r' + ('00' + (year - 2018)).slice(-2);

      const url_0 = 'https://www.cse.ce.nihon-u.ac.jp/webcon/' + strYear; // 年度 r03 h31
      const url_1 = url_0 + '/u' + changeStudentNo(year, no) + '/'; // 学生番号
      const url_2 = url_1 + this.pracs[index].path; // 課題番号

      return url_2;
    },
  },
];

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
    const newFavorites = favorites.sort((a, b) => a - b);
    data.favorites = newFavorites;

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
  // if (result.favorites.length !== 0 && favorites.length !== 0) {

  // 全てのデータ
  // setを使う
  const allData_0 = [...new Set([...result.favorites, ...localFavorites])];
  const allData = allData_0.sort((a, b) => a - b);

  // 共通データ
  const sameData = result.favorites.filter((v) => {
    return localFavorites.includes(v);
  });
  if (sameData.length > 10) {
    sameData.length = 10;
    sameData.push(NaN);
  }
  // Gitにしかないデータ
  const gitOnlyData = result.favorites.filter((v) => {
    return !localFavorites.includes(v);
  });
  if (gitOnlyData.length > 10) {
    gitOnlyData.length = 10;
    gitOnlyData.push(NaN);
  }

  // ローカルにしかないデータ
  const localData = localFavorites.filter((v) => {
    return !result.favorites.includes(v);
  });
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
    localFirst: localStrage.getFirst() || 20216050,
    gitFirst: result.first,
  };
  // }
};
