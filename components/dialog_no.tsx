"use client";

import "../public/css/dialog_no.scss";
import { useEffect, useRef, useState } from "react";
import { localStrage } from "../features/update";
import DialogNoFavorite from "./dialog_no_favorite";
import { useSession } from "next-auth/react";
import DialogNoDetail from "./dialog_no_detail";
import DialogNoRight from "./dialog_no_right";

type Props = {
  initData: { first: number; favorites: number[]; isLocalStorage: boolean }; // 初期データ
  onClose(): void; // ウィンドウを閉じる
  onSelect(): void; // ウィンドウを選択
  isVisible: boolean; // 表示するか否か
  onStudentNo(studentNo: number): void; // 現在の学生番号を更新
  onAddMessage(message: string): void; // メッセージを格納
  studentNo: number; // 現在の学生番号
  iframeVisible(bool: boolean): void; // iframeの表示・非表示を変更
};

// POSTの処理
const fetchPOST = async (
  id: string,
  first: number,
  favorites: number[],
  isLocalStorage: boolean
) => {
  const json = { favorites, first, isLocalStorage };

  await fetch(`/api/users/${id}`, {
    method: "POST",
    body: JSON.stringify(json),
  });
};

const DialogNo: React.FC<Props> = ({
  initData,
  studentNo,
  isVisible,
  onClose,
  onSelect,
  onAddMessage,
  onStudentNo,
  iframeVisible,
}) => {
  // ステータス情報を取得
  const { data: session } = useSession();

  // -------- ここからステートの変数宣言
  const ref = useRef(0); // 起動時実行を防止

  // お気に入りリスト・最初に表示ステート
  const [first, setFirst] = useState<number>(initData.first);
  const [favorites, setFavorites] = useState<number[]>(initData.favorites);
  const [isLocalStorage, setIsLocalStorage] = useState<boolean>(
    initData.isLocalStorage
  );

  // 現在学生番号の「お気に入り」「最初に表示」の状態
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(false);

  // データを更新する
  useEffect(() => {
    // 起動時実行を防止
    const breakPoint = initData.isLocalStorage ? 3 : 2;
    if (ref.current < breakPoint) {
      ref.current += 1;
      console.log("飛ばし");
      return;
    }

    if (!isLocalStorage && session?.user?.email) {
      // Git上で書き込み
      console.log("Git更新");
      fetchPOST(session.user.email, first, favorites, isLocalStorage);
    } else {
      // ローカルストレージに書き込み
      console.log("Local更新");
      localStrage.setFavorites(favorites);
      localStrage.setFirst(first);
    }
    // eslint-disable-next-line
  }, [favorites, first, isLocalStorage]);

  // 学生番号・お気に入り更新時の処理
  useEffect(() => {
    // 最初に表示を反映
    const newIsFirst = first === studentNo;
    setIsFirst(newIsFirst);
    // お気に入りの状態を反映
    const newIsFavorite = favorites.includes(studentNo);
    setIsFavorite(newIsFavorite);
    // eslint-disable-next-line
  }, [studentNo, favorites]);

  // お気に入りボタン押下時の処理
  const handleFavoriteChange = (bool: boolean) => {
    setIsFavorite(bool);

    // お気に入りリストに登録・削除
    const newFavorites = bool
      ? [...favorites, studentNo]
      : favorites.filter((v) => v !== studentNo);
    const newFavorites2 = newFavorites.sort((a, b) => a - b);

    setFavorites(newFavorites2);
  };

  // 最初に表示 押下時の処理
  const handleFirstChange = (bool: boolean) => {
    // 最初に表示を反映
    setIsFirst(bool);

    // ローカルストレージに反映
    const newData = bool ? studentNo : 20216050;

    setFirst(newData);
  };

  // クラス名を反映
  const visibleClassName = !isVisible ? " disabled" : "";
  const className = "dialog" + visibleClassName;

  // 起動時実行（DOM操作あり）
  useEffect(() => {
    if (isLocalStorage) {
      const newFavorites = localStrage.getFavorites();
      setFavorites(newFavorites);
      const newFirst = localStrage.getFirst() || 20216050;
      setFirst(newFirst);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={className} onClick={onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <DialogNoFavorite
            onStudentNo={onStudentNo}
            onIframeVisible={(bool) => iframeVisible(bool)}
            onAddMessage={onAddMessage}
            favorites={favorites}
            setFavorites={setFavorites}
            setFirst={setFirst}
            isLocalStorage={isLocalStorage}
            setIsLocalStorage={setIsLocalStorage}
          />

          <p>
            <b>学生番号</b>
          </p>
          <div className="no">
            <DialogNoDetail studentNo={studentNo} onStudentNo={onStudentNo} />
            <DialogNoRight
              isFavorite={isFavorite}
              isFirst={isFirst}
              onIsFavorite={handleFavoriteChange}
              onIsFirst={handleFirstChange}
            />
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={onSelect}>
          <span>{studentNo}</span>
        </button>
        <span>学年・学生番号</span>
      </div>
    </>
  );
};
export default DialogNo;
