import { useEffect, useRef, useState } from 'react';
import {
  changeStudentNo,
  changeYearNo,
  gitFetchDifference,
  localStrage,
} from '../features/update';
import DialogFileUpload from './dialog_file_upload';
import DialogConfirm from './dialog_confirm';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  onIframeVisible(bool: boolean): void;
  onStudentNo(num: number): void;
  onAddMessage(message: string): void;
  favorites: number[];
  setFavorites(favorites: number[]): void;
  setFirst(first: number): void;
  isLocalStorage: boolean;
  setIsLocalStorage(bool: boolean): void;
};

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

const DialogNoFavorite: React.FC<Props> = ({
  onIframeVisible,
  onStudentNo,
  onAddMessage,
  favorites,
  setFavorites,
  setFirst,
  isLocalStorage,
  setIsLocalStorage,
}) => {
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

  const [groupFavorites, setGroupFavorites] = useState<
    { year: number; no: number[] }[]
  >([]);

  // お気に入りを学年順に表示されるように変更
  useEffect(() => {
    const newFavorites: { year: number; no: number[] }[] = [];
    const groupData: { [key: number]: { year: number; no: number[] } } = {};

    if (favorites.length === 0) {
      setGroupFavorites([]);
      return;
    }
    favorites.forEach((v) => {
      const res = changeYearNo(v);

      if (!groupData[res.year]) {
        groupData[res.year] = { year: res.year, no: [] };
      }

      groupData[res.year].no.push(res.no);
    });

    for (const year in groupData) {
      newFavorites.push(groupData[year]);
    }

    setGroupFavorites(newFavorites);
  }, [favorites]);

  // インポートの処理
  const handleImport = (
    result: { data: number[]; type: number } | undefined
  ) => {
    setIsVisibleFileUpload(false);
    if (result === undefined) return;
    // 0: 現在のデータに追加
    // 1: ファイルのデータのみ
    if (result.type === 1) {
      setFavorites(result.data); // 上書き

      onAddMessage('Success: お気に入りを更新しました');
    } else if (result.type === 0) {
      // 差分を追加
      const addFavorites = result.data.filter((v) => !favorites.includes(v));

      const newFavorites = [...favorites, ...addFavorites];

      setFavorites(newFavorites);

      onAddMessage('Success: お気に入りを更新しました');
    }
  };

  // 削除の処理
  const handleFavoriteDelete = (result: number | undefined) => {
    setIsVisibleDelete(false);
    if (result === undefined) return;
    if (result === 0) {
      // 削除を実行
      setFavorites([]);

      onAddMessage('Success: お気に入りを削除しました');
    }
  };

  // エクスポートの処理
  const handleExport = (result: number | undefined) => {
    setIsVisibleExport(false);
    if (result === undefined) return;
    if (result === 0) {
      // txtデータをエクスポートします
      const data = localStrage.getFavorites();
      const text = data.join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my_favorite_data.txt';
      a.click();
      URL.revokeObjectURL(url);
      onAddMessage('Success: エクスポートが完了しました');
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
        setIsLocalStorage(bool);
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
        setIsLocalStorage(newIsLocalStorage);
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        setFavorites(subData.current.localData);
        setFirst(subData.current.localFirst);
        onAddMessage('設定が完了しました');
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
        setIsLocalStorage(newIsLocalStorage);
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        setFavorites(subData.current.gitData);
        setFirst(subData.current.gitFirst);
        onAddMessage('設定が完了しました');
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
        setIsLocalStorage(newIsLocalStorage);
        if (newIsLocalStorage) {
          const result = await changeGitIsLocalStorage(
            session?.user?.email || '',
            newIsLocalStorage
          );
          if (!result.success) return;
        }
        setFavorites(subData.current.allData);
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
                setFirst(subData.current.localFirst);
                break;
              case 1: // Gitデータ
                setFirst(subData.current.gitFirst);
                break;
              default:
                return;
            }
            setIsVisibleConfirm(false);
            onAddMessage('設定が完了しました');
          };
        } else {
          onAddMessage('設定が完了しました');
        }
        break;
      }
      default:
        break;
    }
  };

  // iframeの表示・非表示
  useEffect(() => {
    onIframeVisible(isVisibleFileUpload || isVisibleDelete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisibleFileUpload, isVisibleDelete]);

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
        favorites={favorites}
        isVisible={isVisibleFileUpload}
        onClose={handleImport}
      />

      <p className="favoriteP">
        <b>お気に入り</b>
        <button onClick={() => setIsVisibleFileUpload(true)}>インポート</button>
        <button onClick={() => setIsVisibleExport(true)}>エクスポート</button>
        {favorites.length !== 0 && (
          <button onClick={() => setIsVisibleDelete(true)}>削除</button>
        )}
      </p>
      <div className="favoriteSelect">
        <div className={'desc' + (isLocalStorage ? ' selected' : '')}>
          <div>
            <p>ﾛｰｶﾙｽﾄﾚｰｼﾞ</p>
            {/* <span>この端末でのみ閲覧できます</span> */}
          </div>
          <Image
            src={'/images/my_icon_chrome.png'}
            width={20}
            height={20}
            alt="Chrome"
          />
        </div>
        <div className="toggle">
          <input
            type="checkbox"
            id="favorite_select"
            checked={!isLocalStorage}
            onChange={(e) => handleIsLocalChange(!e.target.checked)}
          />
          <label htmlFor="favorite_select"></label>
        </div>
        <div className={'desc' + (!isLocalStorage ? ' selected' : '')}>
          <Image
            src={'/images/my_icon_github.png'}
            width={20}
            height={20}
            alt="GitHub"
          />
          <div>
            <p>Git連携</p>
            {/* <span>Gitで紐づけ、別端末でも閲覧できます</span> */}
          </div>
        </div>
      </div>
      <section className="favorite">
        {groupFavorites.length === 0 && <p>お気に入りが表示されます</p>}
        {groupFavorites.map((v, index) => {
          return (
            <div key={index}>
              <p>{v.year}年度</p>
              {v.no.map((w, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => onStudentNo(changeStudentNo(v.year, w))}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DialogNoFavorite;
