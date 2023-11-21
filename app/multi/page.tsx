"use client";

import { useEffect, useState } from "react";
import DialogMenu from "../../components/dialog_footer";
import {
  changeStudentNo,
  changeYearNo,
  localStrage,
  pracData,
} from "../../features/update";

import "../../../public/css/multi.scss";
import "../../../public/css/dialog.scss";
import Image from "next/image";
import PanelNo from "../../components/panel_no";

const Home = () => {
  const [range, setRange] = useState<{ year: number; st: number; en: number }>({
    year: 2021,
    st: 50,
    en: 100,
  });
  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

  // ダイアログを表示
  const handleSelect = (num: number) => {
    if (selectDialog === num) {
      buttonClose();
      return;
    }
    setSelectDialog(num);
  };

  // ダイアログを閉じる
  const buttonClose = () => {
    setSelectDialog(-1);
  };

  const students: number[] = [];
  for (let i = range.st; i < range.en + 1; i++) {
    const studentNo = changeStudentNo(range.year, i);
    students.push(studentNo);
  }

  const onStNo = (num: number) => {
    setRange({ ...range, st: num });
  };

  const onEnNo = (num: number) => {
    setRange({ ...range, en: num });
  };
  const onYear = (num: number) => {
    setRange({ ...range, year: num });
  };

  return (
    <div>
      <div className="iframe">
        <div>
          {students.map((v, index) => {
            const yearNo = changeYearNo(v);
            const url = pracData[0].makeUrl(yearNo.year, yearNo.no, 0);
            return <Iframe key={index} url={url} studentNo={v} />;
          })}
        </div>
      </div>
      <div className="single__footer">
        <DialogMenu
          onClose={buttonClose}
          onSelect={() => handleSelect(0)}
          isVisible={selectDialog === 0}
        />
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <div className="panel">
              <p>初め</p>
              <PanelNo no={range.st} onChangeNo={onStNo} />
            </div>
            <div className="panel">
              <p>終り</p>
              <PanelNo no={range.en} onChangeNo={onEnNo} />
            </div>
            <div className="panel">
              <p>年度</p>
              <PanelNo no={range.year} onChangeNo={onYear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

type IframeProps = {
  url: string;
  studentNo: number;
};
const Iframe = (props: IframeProps) => {
  // 現在のやつがお気に入りか
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const data = localStrage.getFavorites();
    setIsFavorite(data.includes(props.studentNo));
  }, [props.studentNo]);

  // お気に入りボタン押下時の処理
  const handleFavoriteChange = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);

    // お気に入りリストに登録・削除
    const newFavorites = newIsFavorite
      ? [...localStrage.getFavorites(), props.studentNo]
      : localStrage.getFavorites().filter((v) => v !== props.studentNo);

    // ローカルストレージに書き込み
    localStrage.setFavorites(newFavorites);
  };

  return (
    <div>
      <iframe src={props.url} width={1260} height={1260}></iframe>
      <button onClick={handleFavoriteChange}>
        <Image
          src={
            isFavorite ? "/images/star_blue_icon.svg" : "/images/star_icon.svg"
          }
          width={150}
          height={150}
          alt="星"
        />
      </button>
      <div>
        <p>{props.studentNo}</p>
      </div>
    </div>
  );
};
