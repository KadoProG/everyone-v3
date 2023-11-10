"use client";
import Image from "next/image";
import "../public/css/dialog_no.scss";
import { useEffect, useState } from "react";
import { changeStudentNo, changeYearNo, localStrage } from "../features/update";
import DialogNoFavorite from "./dialog_no_favorite";
import PanelNo from "./panel_no";

type Props = {
  onClose(): void;
  onSelect(): void;
  onChangeYear(num: number): void;
  onChangeNo(num: number): void;
  isVisible: boolean;
  onAddMessage(message: string): void;
  no: number;
  year: number;
  iframeVisible(bool: boolean): void;
};

const DialogNo = (props: Props) => {
  // 学生番号を格納
  const [studentNo, setStudentNo] = useState<number>(20216050);

  // お気に入りリスト
  const [favorites, setFavorites] = useState<number[]>([]);

  // 現在選択中がお気に入りか否か
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 現在選択中が「最初に表示」か否か
  const [isFirst, setIsFirst] = useState<boolean>(false);

  // お気に入りボタン押下時の処理
  const handleFavoriteChange = (bool: boolean) => {
    setIsFavorite(bool);

    // お気に入りリストに登録・削除
    const newFavorites = bool
      ? [...favorites, studentNo]
      : favorites.filter((v) => v !== studentNo);

    setFavorites(newFavorites);

    // ローカルストレージに書き込み
    localStrage.setFavorites(newFavorites);
  };

  // 最初に表示 押下時の処理
  const handleFirstChagne = (bool: boolean) => {
    // 最初に表示を反映
    setIsFirst(bool);
    // ローカルストレージに反映
    const newData = bool ? studentNo : null;
    localStrage.setFirst(newData);
  };

  // 学生番号を取得
  useEffect(() => {
    const newStudentNo = changeStudentNo(props.year, props.no);
    setStudentNo(newStudentNo);
    // 最初に表示を反映
    const newIsFirst = localStrage.getFirst() === newStudentNo;
    setIsFirst(newIsFirst);
    // お気に入りの状態を反映
    const newIsFavorite = localStrage.getFavorites().includes(newStudentNo);
    setIsFavorite(newIsFavorite);
  }, [props.no, props.year]);

  // クラス名を反映
  const visibleClassName = !props.isVisible ? " disabled" : "";
  const className = "dialog" + visibleClassName;

  // 手書きでチェンジしたときの動作
  const handleNoChange = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) return;
    props.onChangeNo(num);
  };

  // お気に入りの中の学生番号が押されたときの処理
  const handleStudentNoClick = (num: number) => {
    const result = changeYearNo(num);
    props.onChangeYear(result.year);
    props.onChangeNo(result.no);
  };

  // 起動時実行（DOM操作あり）
  useEffect(() => {
    const newFavorites = localStrage.getFavorites();
    setFavorites(newFavorites);
  }, []);

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
                  no={props.year}
                  onChangeNo={props.onChangeYear}
                  className="year"
                  displayEnText="年度"
                />
              </section>

              <section className="num">
                <PanelNo
                  no={props.no}
                  onChangeNo={props.onChangeNo}
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

type ButtonArrowProps = {
  onClick(): void;
};

// 矢印ボタンのみコンポーネント化
const ButtonArrow = (props: ButtonArrowProps) => {
  return (
    <button onClick={props.onClick}>
      <Image src="/images/mark_left.svg" width={20} height={20} alt="左矢印" />
    </button>
  );
};
