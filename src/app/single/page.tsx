"use client";

import { useEffect, useState } from "react";
import "../../../public/css/single.scss";
import DialogNo from "../../../components/dialog_no";
import DialogSite from "../../../components/dialog_site";

type IframeStatus = {
  width: number;
  height: number;
};

const Home = () => {
  const BASE_URL = "https://www.cse.ce.nihon-u.ac.jp/webcon/";

  const [url, setUrl] = useState<string>(BASE_URL);

  // 現在の情報ステータス
  const [no, setNo] = useState<number>(50);
  const [year, setYear] = useState<number>(2021);
  const [studentNo, setStudentNo] = useState<number>(20216050);

  // 学生番号関係が更新されたらURLを更新
  const updateUrl = () => {
    const strYear =
      year < 2020
        ? "h" + ("00" + (year - 1988)).slice(-2)
        : "r" + ("00" + (year - 2018)).slice(-2);

    const strNo = no < 0 ? ("000" + 1).slice(-3) : ("000" + no).slice(-3);

    const numYear = year < 2020 ? ("00" + (year - 1988)).slice(-2) : year;
    const newUrl = BASE_URL + strYear + "/u" + numYear + "6" + strNo + "/";

    setUrl(newUrl);
    setStudentNo(parseInt(numYear + "6" + strNo));
  };

  // 学生番号が更新されたら処理を実行
  useEffect(updateUrl, [no, year]);

  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

  const [iframeStatus, setIframeStaus] = useState<IframeStatus>();

  // ダイアログを閉じる
  const buttonClose = () => {
    setSelectDialog(-1);
  };

  // ダイアログを表示
  const handleSelect = (num: number) => {
    if (selectDialog === num) {
      buttonClose();
      return;
    }
    setSelectDialog(num);
  };

  // 起動時に実行
  useEffect(() => {
    setIframeStaus({ width: innerWidth, height: innerHeight - 60 });
    window.addEventListener("resize", () => {
      setIframeStaus({ width: innerWidth, height: innerHeight - 60 });
    });
  }, []);

  return (
    <div>
      <iframe
        src={url}
        width={iframeStatus?.width}
        height={iframeStatus?.height}
      ></iframe>

      <DialogNo
        isVisible={selectDialog === 0}
        onClose={buttonClose}
        onPrevNo={() => setNo(no - 1)}
        onNextNo={() => setNo(no + 1)}
        onPrevYear={() => setYear(year - 1)}
        onNextYear={() => setYear(year + 1)}
        changeNo={(num) => setNo(num)}
        no={no}
        year={year}
      />
      <DialogSite
        isVisible={selectDialog === 2}
        onClose={buttonClose}
        onChangeUrl={(url) => setUrl(url)}
        url={url}
      />
      <div className="single__footer">
        <button className="single__footer__left">
          <span></span>
        </button>
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <div className="single__footer__right__button">
              <button onClick={() => handleSelect(0)}>
                <span>{studentNo}</span>
              </button>
              <span>学年・学生番号</span>
            </div>
            <div className="single__footer__right__button">
              <button>
                <span>Webｺﾝﾃﾝﾂ</span>
                <span>INDEX</span>
              </button>
              <span>講義・課題</span>
            </div>
            <div className="single__footer__right__button">
              <button onClick={() => handleSelect(2)}>OK</button>
              <span>サイト</span>
            </div>
            <div className="single__footer__right__button">
              <button>あ</button>
              <span>ﾚｽﾎﾟﾝｼﾌﾞ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
