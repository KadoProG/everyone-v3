"use client";
import Image from "next/image";
import "../public/css/dialog_no.scss";
import { useEffect, useState } from "react";
import { changeStudentNo, changeYearNo, localStrage } from "../features/update";

type Props = {
  onClose(): void;
  onSelect(): void;
  onChangeYear(num: number): void;
  onChangeNo(num: number): void;
  isVisible: boolean;
  no: number;
  year: number;
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
    // お気に入りリストに登録・削除
    const newFavorites = bool
      ? [...favorites, studentNo]
      : favorites.filter((v) => v !== studentNo);

    setIsFavorite(bool);
    setFavorites(newFavorites);

    // ローカルストレージに書き込み
    localStrage.setFavorites(newFavorites);
  };

  // 最初に表示 押下時の処理
  const handleFirstChagne = (bool: boolean) => {
    // 最初に表示を反映
    setIsFirst(bool);
    const newData = bool ? studentNo : null;
    localStrage.setFirst(newData);
  };
  // ロード時に実行
  useEffect(() => {
    // ローカルストレージを取得
    const res = localStrage.getFavorites();
    setFavorites(res);
  }, []);

  // 学生番号を取得
  useEffect(() => {
    const newStudentNo = changeStudentNo(props.year, props.no);
    setStudentNo(newStudentNo);
  }, [props.no, props.year]);

  // お気に入りの状態を反映
  useEffect(() => {
    const newIsFavorite = favorites.findIndex((v) => v === studentNo) !== -1;
    const newIsFirst = studentNo === localStrage.getFirst();
    setIsFavorite(newIsFavorite);
    setIsFirst(newIsFirst);
  }, [studentNo, favorites]);

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

  return (
    <>
      <div className={className} onClick={props.onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p className="favoriteFlex">
            <b>お気に入り</b>
            <button>インポート</button>
            <button>エクスポート</button>
            <button>削除</button>
          </p>
          <section className="prac">
            {favorites.length === 0 && <p>お気に入りが表示されます</p>}
            {favorites.map((v, index) => (
              <button key={index} onClick={() => handleStudentNoClick(v)}>
                {v}
              </button>
            ))}
          </section>
          <p>
            <b>学生番号</b>
          </p>
          <div className="no">
            <div className="left">
              <section className="year">
                <ButtonArrow
                  onClick={() => props.onChangeYear(props.year - 1)}
                />
                <span>{props.year}年度</span>
                <ButtonArrow
                  onClick={() => props.onChangeYear(props.year + 1)}
                />
              </section>

              <section className="num">
                <ButtonArrow onClick={() => props.onChangeNo(props.no - 1)} />
                <input
                  type="text"
                  value={props.no}
                  onChange={(e) => handleNoChange(e.target.value)}
                />
                <ButtonArrow onClick={() => props.onChangeNo(props.no + 1)} />
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
