import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  pushArrMessage,
  setFavorites,
  setFirst,
  setIframeVisible,
  setIsLocalStorage,
} from '../../../app/single/singleSlice';
import { gitFetchDifference } from '../../../features/update';
import { Button } from '../../../stories/Button';
import DialogConfirm from '../DialogConfirm';
import DialogFileUpload from '../DialogFileUpload';
import styles from './DialogNoFavorite.module.scss';
import DialogNoFavoriteToggle from './DialogNoFavoriteToggle';
import ShowFavorites from './ShowFavorites';

const changeGitIsLocalStorage = async (
  id: string,
  bool: boolean
): Promise<{
  success: boolean;
  data: { first: number; favorites: number[]; isLocalStorage: boolean };
}> => {
  const url = `/api/users/${id}/change`;
  const body = { isLocalStorage: bool };
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res);
};

const DialogNoFavorite: React.FC = () => {
  const question = useRef<string[]>([]);
  const subData = useRef<{
    allData: number[];
    gitData: number[];
    localData: number[];
    localFirst: number;
    gitFirst: number;
  }>({
    gitData: [],
    allData: [],
    localData: [],
    localFirst: 20216050,
    gitFirst: 20216050,
  });
  // ステートメントの取得・定義
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const favorites = data.favorites;
  const isLocalStorage = data.isLocalStorage;

  // 確認ダイアログのプロパティ
  const dialogConfirm = useRef<{
    question: string | string[];
    onClose(num: number | undefined): void;
    answers: string[];
  }>({ question: '', answers: [], onClose: () => {} });

  const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);

  // ログイン状態を取得
  const { data: session } = useSession();

  // エクスポートダイアログ
  const [isVisibleExport, setIsVisibleExport] = useState<boolean>(false);

  // 削除ダイアログ
  // ファイルアップロードか否か
  const [isVisibleFileUpload, setIsVisibleFileUpload] =
    useState<boolean>(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);
  const [isVisibleGitLogin, setIsVisibleGitLogin] = useState<boolean>(false);
  const [isVisibleGitFetch, setIsVisibleGitFetch] = useState<boolean>(false);

  // 削除の処理
  const handleFavoriteDelete = (result: number | undefined) => {
    setIsVisibleDelete(false);
    if (result === undefined) return;
    if (result === 0) {
      // 削除を実行
      dispatch(setFavorites([]));

      dispatch(pushArrMessage('Success: お気に入りを削除しました'));
    }
  };

  // エクスポートの処理
  const handleExport = (result: number | undefined) => {
    setIsVisibleExport(false);
    if (result === undefined) return;
    if (result === 0) {
      // txtデータをエクスポートします
      const textData = favorites;
      const text = textData.join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my_favorite_data.txt';
      a.click();
      URL.revokeObjectURL(url);
      dispatch(pushArrMessage('Success: エクスポートが完了しました'));
    }
  };

  // Git連携時にログインダイアログ、の処理
  const handleLogin = (result: number | undefined) => {
    setIsVisibleGitLogin(false);
    if (result === undefined || result !== 0) return;
    signIn();
  };

  // LocalStorage Or Git連携のCheckBox時の処理
  const handleIsLocalChange = async (bool: boolean) => {
    if (bool) {
      // LocalStorage管理にします
      if (session?.user?.email) {
        const questionData = await gitFetchDifference(session?.user?.email);
        question.current = questionData.arrMessage;
        subData.current = questionData;
        setIsVisibleGitFetch(true);
      } else {
        dispatch(setIsLocalStorage(bool));
      }
    } else {
      // Git管理にします
      if (!session?.user?.email) {
        // ログインさせる
        setIsVisibleGitLogin(true);
      } else {
        // ローカルストレージとGitデータの競合問題を解決する
        const questionData = await gitFetchDifference(session.user.email);
        question.current = questionData.arrMessage;
        subData.current = questionData;
        setIsVisibleGitFetch(true);
      }
    }
  };

  const handleGitFetch = async (result: number | undefined) => {
    setIsVisibleGitFetch(false);
    if (result === undefined) return;
    switch (result) {
      // Localデータのみにしたい
      case 0: {
        // 1: Local→Git Gitにデータを転送→完了 GitデータのisLocalStorageをfalse
        // 2: Git→Local Gitデータを破棄 GitデータのisLocalStorageをtrue
        const newIsLocalStorage = !isLocalStorage;
        dispatch(setIsLocalStorage(newIsLocalStorage));
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        dispatch(setFavorites(subData.current.localData));
        dispatch(setFirst(subData.current.localFirst));
        dispatch(pushArrMessage('設定が完了しました'));
        break;
      }
      // Gitデータのみにしたい
      case 1: {
        // 1: Local→Git ローカルデータを削除、ステートも更新 GitデータのisLocalStorageをfalse
        // 2: Git→Local Gitデータを削除、ステートも更新 GitデータのisLocalStorageをtrue
        // ただワンちゃんisLocalStorageを変更してステート更新すれば
        // 勝手に更新してくれる説あるから、isLocalStorageをHooksに
        // おけば解決するかも
        const newIsLocalStorage = !isLocalStorage;
        dispatch(setIsLocalStorage(newIsLocalStorage));
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        dispatch(setFavorites(subData.current.gitData));
        dispatch(setFirst(subData.current.gitFirst));
        dispatch(pushArrMessage('設定が完了しました'));
        break;
      }
      // LocalもGitも統合したい
      case 2: {
        // 統合 結合し、転送→ﾛｰｶﾙﾃﾞｰﾀを削除、ステートも更新→完了
        // 1: Local→Git ローカルデータを削除、ステートも更新 GitデータのisLocalStorageをfalse
        // 2: Git→Local Gitデータを削除、ステートも更新 GitデータのisLocalStorageをtrue
        // そもそも削除が必要か問題→必要。ログイン時再読込されるため、confirmが聞けない
        // あるいは初期GitログインでisLocalStorageをtrueにすると、根本は解決するかも
        // 直近？：
        /// Gitデータ管理の初期isLocalStorageをTrueにする
        /// NextAuthの再読み込みを禁止？別のダイアログ形式にできたらやってみる
        const newIsLocalStorage = !isLocalStorage;
        dispatch(setIsLocalStorage(newIsLocalStorage));
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        dispatch(setFavorites(subData.current.allData));
        if (subData.current.gitFirst !== subData.current.localFirst) {
          dialogConfirm.current.question = [
            '最初に表示するのはどちらにしますか？',
            `ローカルデータ：${subData.current.localFirst}`,
            `Gitデータ：${subData.current.gitFirst}`,
          ];
          dialogConfirm.current.answers = [
            String(subData.current.localFirst),
            String(subData.current.gitFirst),
          ];

          setIsVisibleConfirm(true);

          dialogConfirm.current.onClose = (result) => {
            if (result === undefined) return;
            switch (result) {
              case 0: // ローカルデータ
                dispatch(setFirst(subData.current.localFirst));
                break;
              case 1: // Gitデータ
                dispatch(setFirst(subData.current.gitFirst));
                break;
              default:
                return;
            }
            setIsVisibleConfirm(false);
            dispatch(pushArrMessage('設定が完了しました'));
          };
        } else {
          dispatch(pushArrMessage('設定が完了しました'));
        }
        break;
      }
      default:
        break;
    }
  };

  // iframeの表示・非表示
  useEffect(() => {
    dispatch(setIframeVisible(isVisibleFileUpload || isVisibleDelete));
  }, [isVisibleFileUpload, isVisibleDelete, dispatch]);

  return (
    <>
      <DialogConfirm
        question="本当に削除してもよろしいですか？"
        isVisible={isVisibleDelete}
        answers={['削除する']}
        onClose={handleFavoriteDelete}
      />

      <DialogConfirm
        question="お気に入りデータをエクスポートします。よろしいですか？"
        isVisible={isVisibleExport}
        answers={['はい']}
        onClose={handleExport}
      />

      <DialogConfirm
        question="Git連携するにはログインが必要です。ログインしますか？"
        isVisible={isVisibleGitLogin}
        answers={['はい']}
        onClose={handleLogin}
      />

      <DialogConfirm
        question={question.current}
        isVisible={isVisibleGitFetch}
        answers={['ローカルデータのみ', 'Gitデータのみ', 'すべて統合']}
        onClose={handleGitFetch}
      />

      <DialogConfirm
        question={dialogConfirm.current.question}
        isVisible={isVisibleConfirm}
        answers={dialogConfirm.current.answers}
        onClose={dialogConfirm.current.onClose}
      />

      <DialogFileUpload
        isVisible={isVisibleFileUpload}
        onClose={() => setIsVisibleFileUpload(false)}
      />

      <p className={styles.favoriteP}>
        <b>お気に入り</b>
        <Button
          onClick={() => setIsVisibleFileUpload(true)}
          label="インポート"
        />
        <Button onClick={() => setIsVisibleExport(true)} label="エクスポート" />
        {favorites.length !== 0 && (
          <Button onClick={() => setIsVisibleDelete(true)} label="削除" />
        )}
      </p>
      <DialogNoFavoriteToggle
        isChecked={isLocalStorage}
        onClick={handleIsLocalChange}
      />
      <ShowFavorites />
    </>
  );
};

export default DialogNoFavorite;
