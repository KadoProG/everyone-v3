"use client";

import Image from "next/image";
import "../public/css/dialog_no.scss";
import { useEffect, useState } from "react";
import { changeStudentNo, changeYearNo } from "../features/update";
import DialogNoFavorite from "./dialog_no_favorite";
import PanelNo from "./panel_no";
import { useSession } from "next-auth/react";

type Props = {
  initData: { first: number; favorites: number[] };
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
  onStudentNo(studentNo: number): void;
  onAddMessage(message: string): void;
  studentNo: number;
  iframeVisible(bool: boolean): void;
};

const fetchPOST = async (id: string, first: number, favorites: number[]) => {
  const json = { favorites, first };

  const res = await fetch(`/api/users/${id}`, {
    method: "POST",
    body: JSON.stringify(json),
  });
};

const DialogNo = (props: Props) => {
  // 初期データを取得
  const initData = props.initData;
  const studentNo = props.studentNo; // 学生番号

  // ステータス情報を取得
  const { data: session } = useSession();

  // -------- ここからステートの変数宣言
  // お気に入りリスト
  const [favorites, setFavorites] = useState<number[]>(initData.favorites);

  // 現在選択中がお気に入りか否か
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 現在選択中が「最初に表示」か否か
  const [isFirst, setIsFirst] = useState<boolean>(false);

  const [first, setFirst] = useState<number>(initData.first);

  // データを更新する
  useEffect(() => {
    if (session?.user?.name) {
      fetchPOST(session?.user.name, first, favorites);
    } else {
      // // ローカルストレージに書き込み
      // localStrage.setFavorites(newFavorites);
    }
  }, [favorites, first]);

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
  const handleFirstChagne = (bool: boolean) => {
    // 最初に表示を反映
    setIsFirst(bool);

    // ローカルストレージに反映
    const newData = bool ? studentNo : 20216050;

    setFirst(newData);
  };

  // 学生番号を取得
  useEffect(() => {
    // 最初に表示を反映
    const newIsFirst = first === studentNo;
    setIsFirst(newIsFirst);
    // お気に入りの状態を反映
    const newIsFavorite = favorites.includes(studentNo);
    setIsFavorite(newIsFavorite);
  }, [studentNo]);

  // クラス名を反映
  const visibleClassName = !props.isVisible ? " disabled" : "";
  const className = "dialog" + visibleClassName;

  // お気に入りの中の学生番号が押されたときの処理
  const handleStudentNoClick = (num: number) => {
    props.onStudentNo(num);
  };

  // 学生番号が変更されたときの処理「年度」
  const onYear = (year: number) => {
    const newYearNo = changeYearNo(studentNo);
    props.onStudentNo(changeStudentNo(year, newYearNo.no));
  };
  // 学生番号が変更されたときの処理「番号」
  const onNo = (no: number) => {
    const newYearNo = changeYearNo(studentNo);
    props.onStudentNo(changeStudentNo(newYearNo.year, no));
  };

  return (
    <>
      <div className={className} onClick={props.onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <DialogNoFavorite
            onStudentNo={handleStudentNoClick}
            onIframeVisible={(bool) => props.iframeVisible(bool)}
            onAddMessage={props.onAddMessage}
            favorites={favorites}
            setFavorites={setFavorites}
          />

          <p>
            <b>学生番号</b>
          </p>
          <div className="no">
            <div className="left">
              <section className="year">
                <PanelNo
                  no={changeYearNo(props.studentNo).year}
                  onChangeNo={onYear}
                  className="year"
                  displayEnText="年度"
                />
              </section>

              <section className="num">
                <PanelNo
                  no={changeYearNo(props.studentNo).no}
                  onChangeNo={onNo}
                  className="num"
                />
              </section>
            </div>

            <div className="right">
              <input
                type="checkbox"
                id="dialog__content__no__favorite"
                checked={isFavorite}
                onChange={(e) => handleFavoriteChange(e.target.checked)}
              />
              <label htmlFor="dialog__content__no__favorite">
                <Image
                  src={
                    isFavorite
                      ? "/images/star_blue_icon.svg"
                      : "/images/star_icon.svg"
                  }
                  width={24}
                  height={24}
                  alt="星"
                />
                <span>お気に入り</span>
              </label>
              <input
                type="checkbox"
                id="dialog__no__checkbox"
                checked={isFirst}
                onChange={(e) => handleFirstChagne(e.target.checked)}
              />
              <label htmlFor="dialog__no__checkbox">次回最初に表示</label>
            </div>
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={props.onSelect}>
          <span>{studentNo}</span>
        </button>
        <span>学年・学生番号</span>
      </div>
    </>
  );
};
export default DialogNo;
