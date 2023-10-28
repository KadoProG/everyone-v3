"use client";
import Image from "next/image";
import "../public/css/dialog_no.scss";
import { useEffect, useState } from "react";
import { changeStudentNo } from "../features/update";

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

  // // お気に入りリスト
  // const [favorites, setFavorites] = useState<number[]>([]);

  // 現在選択中がお気に入りか否か
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // useEffect(() => {
  //   const res = window.localStorage.getItem("everyone_v3_favorite_data");

  //   console.log(res);
  //   if (!res) return;
  // });

  // 学生番号を取得
  useEffect(() => {
    setStudentNo(changeStudentNo(props.year, props.no));
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

  return (
    <>
      <div className={className} onClick={props.onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p>
            <b>お気に入り</b>
          </p>

          <p>ここにダイアログの内容を追加します。</p>
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
                onChange={(e) => setIsFavorite(e.target.checked)}
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
              <input type="checkbox" id="dialog__no__checkbox" />
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
