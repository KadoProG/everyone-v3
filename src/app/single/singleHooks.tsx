import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setFavorites,
  setFirst,
  setStudentNo,
  setUrl,
} from '@/app/single/singleSlice';
import { initStudentNo } from '@/const';
import { changeYearNo } from '@/utils/change';
import { pracData } from '@/utils/pracData';
import { localStrage } from '@/utils/update';

// POSTの処理
const fetchPOST = async (
  id: string,
  first: number,
  favorites: number[],
  isLocalStorage: boolean
) => {
  const json = { favorites, first, isLocalStorage };

  await fetch(`/api/users/${id}`, {
    method: 'POST',
    body: JSON.stringify(json),
  });
};

const SingleHooks: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const studentNo = data.studentNo;
  const favorites = data.favorites;
  const first = data.first;
  const isLocalStorage = data.isLocalStorage;
  const pracIndex = data.pracIndex;
  const pracDetail = data.pracDetail;

  // 学生番号関係が更新されたらURLを更新する関数
  const updateUrl = () => {
    // URLを更新
    const result = changeYearNo(studentNo);
    const newUrl = pracData[pracIndex].makeUrl(
      result.year,
      result.no,
      pracDetail
    );
    dispatch(setUrl(newUrl));
  };

  // -------- ここからステートの変数宣言
  const ref = useRef(0); // 起動時実行を防止

  // 学生番号が更新されたら処理を実行
  // eslint-disable-next-line
  useEffect(updateUrl, [studentNo, pracIndex, pracDetail]);

  // データを更新する
  useEffect(() => {
    // 起動時実行を防止
    // const breakPoint = isLocalStorage ? 3 : 2;
    // console.log('上記はdev時に使用するのでデプロイ時は下記を有効にしてね');
    const breakPoint = isLocalStorage ? 2 : 1; // dev時は上記を使う
    if (ref.current < breakPoint) {
      // console.log('飛ばし');
      ref.current += 1;
      return;
    }

    if (!isLocalStorage && session?.user?.email) {
      // Git上で書き込み
      // console.log('fetchが実行されます');
      fetchPOST(session.user.email, first, favorites, isLocalStorage);
    } else {
      // ローカルストレージに書き込み
      // console.log('localが実行されます');
      localStrage.setFavorites(favorites);
      localStrage.setFirst(first);
    }
    // eslint-disable-next-line
  }, [favorites, first, isLocalStorage]);

  // 起動時に実行
  useEffect(() => {
    // console.log('起動時実行のサブ', isLocalStorage);
    if (isLocalStorage) {
      // 「最初に表示」の学生番号を反映
      const currentFirst = localStrage.getFirst() || initStudentNo;
      // console.log(currentFirst);
      dispatch(setStudentNo(currentFirst));
      dispatch(setFirst(currentFirst));
      // お気に入りデータを取得してステートに反映
      const newFavorites = localStrage.getFavorites();
      dispatch(setFavorites(newFavorites));
    } else {
      dispatch(setStudentNo(first));
    }
    // eslint-disable-next-line
  }, [isLocalStorage, dispatch]);

  return <input type="hidden" name="" />;
};

export default SingleHooks;
