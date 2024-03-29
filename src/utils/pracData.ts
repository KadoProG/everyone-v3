import { changeStudentNo } from '@/utils/change';

type PracData = {
  /**
   * 課題タイトル
   */
  title: string;
  /**
   * 課題タイトル（省略版）
   */
  mini: string;
  /**
   * 課題の詳細
   */
  pracs: { name: string; path: string }[];
  /**
   * URLを作成する関数
   */
  makeUrl(year: number, no: number, index: number): string;
};

/**
 * 課題データ 追記をする際はこちらに
 */
export const pracData: PracData[] = [
  {
    title: 'Webコンテンツ及び演習',
    mini: 'Webｺﾝ',
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
] as const;
