"use client";
import Image from "next/image";
import "../public/css/panel_no.scss";
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
          <div className="dialog__content__no">
            <div>
              <section className="dialog__content-year">
                <button
                  className="dialog__content__panel"
                  onClick={() => props.onChangeYear(props.year - 1)}
                >
                  <Image
                    src="/images/mark_left.svg"
                    width={20}
                    height={20}
                    alt="左矢印"
                  />
                </button>
                <span className="dialog__content__panel">{props.year}年度</span>
                <button
                  className="dialog__content__panel"
                  onClick={() => props.onChangeYear(props.year + 1)}
                >
                  <Image
                    src="/images/mark_left.svg"
                    width={20}
                    height={20}
                    alt="左矢印"
                  />
                </button>
              </section>
              <section className="dialog__content-num">
                <button
                  className="dialog__content__panel"
                  onClick={() => props.onChangeNo(props.no - 1)}
                >
                  <Image
                    src="/images/mark_left.svg"
                    width={20}
                    height={20}
                    alt="左矢印"
                  />
                </button>
                <input
                  type="text"
                  className="dialog__content__panel"
                  value={props.no}
                  onChange={(e) => handleNoChange(e.target.value)}
                />
                <button
                  className="dialog__content__panel"
                  onClick={() => props.onChangeNo(props.no + 1)}
                >
                  <Image
                    src="/images/mark_left.svg"
                    width={20}
                    height={20}
                    alt="左矢印"
                  />
                </button>
              </section>
            </div>
            <div className="dialog__content__no__right">
              <section>
                <Image
                  src="/images/star_icon.svg"
                  width={24}
                  height={24}
                  alt="星"
                />
              </section>
              <section className="flex">
                <input type="checkbox" name="" id="dialog__no__checkbox" />
                <label htmlFor="dialog__no__checkbox">次回最初に表示する</label>
              </section>
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
