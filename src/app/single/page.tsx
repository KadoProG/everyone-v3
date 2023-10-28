"use client";

import { useEffect, useState } from "react";
import "../../../public/css/single.scss";
import "../../../public/css/dialog.scss";
import DialogNo from "../../../components/dialog_no";
import DialogSite from "../../../components/dialog_site";
import DialogMessage from "../../../components/dialog_message";
import DialogMenu from "../../../components/dialog_footer";
import DialogPrac from "../../../components/dialog_prac";
import { changeYearNo, localStrage, pracData } from "../../../features/update";

type IframeStatus = {
  width: number;
  height: number;
};

const Home = () => {
  const initData = localStrage.getFirst();
  const init =
    initData === null ? { year: 2021, no: 50 } : changeYearNo(initData);

  const [url, setUrl] = useState<string>("");

  // 現在の情報ステータス
  const [year, setYear] = useState<number>(init.year);
  const [no, setNo] = useState<number>(init.no);
  const [pracIndex, setPracIndex] = useState<number>(0);
  const [pracDetail, setPracDetail] = useState<number>(0);

  // 学生番号関係が更新されたらURLを更新
  const updateUrl = () => {
    // URLを更新
    const newUrl = pracData[pracIndex].makeUrl(year, no, pracDetail);
    setUrl(newUrl);
  };

  // 学生番号が更新されたら処理を実行
  useEffect(updateUrl, [no, year, pracIndex, pracDetail]);

  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

  // iframeのステータス
  const [iframeStatus, setIframeStaus] = useState<IframeStatus>();

  // メッセージ軍を格納
  const [arrMessage, setArrMessage] = useState<string[]>([]);

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

  // メッセージを追加
  const setMessage = (message: string) => {
    const newArrMessage = [...arrMessage, message];
    setArrMessage(newArrMessage);
  };

  // 起動時に実行
  useEffect(() => {
    setIframeStaus({ width: innerWidth, height: innerHeight - 60 });
    window.addEventListener("resize", () => {
      setIframeStaus({ width: innerWidth, height: innerHeight - 60 });
    });
    updateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <iframe
        src={url}
        width={iframeStatus?.width}
        height={iframeStatus?.height}
        id="iframe__single"
      ></iframe>

      <div className="single__footer">
        <DialogMenu
          onClose={buttonClose}
          onSelect={() => handleSelect(0)}
          isVisible={selectDialog === 0}
        />
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <DialogNo
              onClose={buttonClose}
              onSelect={() => handleSelect(1)}
              isVisible={selectDialog === 1}
              onChangeYear={(num) => setYear(num)}
              onChangeNo={(num) => setNo(num)}
              no={no}
              year={year}
            />

            <DialogPrac
              onClose={buttonClose}
              onSelect={() => handleSelect(2)}
              isVisible={selectDialog === 2}
              onPracIndex={(num) => setPracIndex(num)}
              onPracDetail={(num) => setPracDetail(num)}
              pracIndex={pracIndex}
              pracDetail={pracDetail}
            />

            <DialogSite
              isVisible={selectDialog === 3}
              onClose={buttonClose}
              onSelect={() => handleSelect(3)}
              onChangeUrl={(url) => setUrl(url)}
              url={url}
              onAddMessage={(message) => setMessage(message)}
            />

            <div className="single__footer__right__button">
              <button>あ</button>
              <span>ﾚｽﾎﾟﾝｼﾌﾞ</span>
            </div>
          </div>
        </div>
      </div>
      <DialogMessage arrMessage={arrMessage} />
    </div>
  );
};
export default Home;
