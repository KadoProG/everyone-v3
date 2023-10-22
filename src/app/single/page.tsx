"use client";

import { useEffect, useState } from "react";
import "../../../public/css/single.scss";
import DialogNo from "../../../components/dialog_no";

type IframeStatus = {
  width: number;
  height: number;
};

type SelectButton = {
  index: number;
  element: JSX.Element;
};

const Home = () => {
  // const BASE_URL = "https://www.cse.ce.nihon-u.ac.jp/webcon/";

  const [no, setNo] = useState<number>(50);
  const [year, setYear] = useState<number>(2021);

  useEffect(() => {
    console.log(no);
  }, [no]);

  const [selectButton, setSelectButton] = useState<SelectButton>({
    index: -1,
    element: <></>,
  });
  const [iframeStatus, setIframeStaus] = useState<IframeStatus>();

  const buttonClose = () => {
    const newSelectButton: SelectButton = {
      index: -1,
      element: <></>,
    };
    setSelectButton(newSelectButton);
  };

  const handleSelect = (num: number) => {
    setSelectButton({ index: num, element: <></> });
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
        src="./../"
        width={iframeStatus?.width}
        height={iframeStatus?.height}
      ></iframe>

      <DialogNo
        isVisible={selectButton.index === 0}
        onClose={buttonClose}
        onPrevNo={() => setNo(no - 1)}
        onNextNo={() => setNo(no + 1)}
        onPrevYear={() => setYear(year - 1)}
        onNextYear={() => setYear(year + 1)}
        changeNo={(num) => setNo(num)}
        no={no}
        year={year}
      />
      {/* {selectButton.element} */}
      <div className="single__footer">
        <button className="single__footer__left">
          <span></span>
        </button>
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <div className="single__footer__right__button">
              <button onClick={() => handleSelect(0)}>
                <span>2021</span>
                <span>6050</span>
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
              <button>OK</button>
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
