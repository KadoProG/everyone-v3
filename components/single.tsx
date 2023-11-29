'use client';

import { useEffect, useState } from 'react';
import { changeYearNo, localStrage, pracData } from '../features/update';
import { IframeStatus } from '../app/single/page';
import DialogMenu from './dialog_footer';
import DialogNo from './dialog_no';
import DialogPrac from './dialog_prac';
import DialogSite from './dialog_site';
import DialogResponsive from './dialog_responsive';
import DialogMessage from './dialog_message';

type Props = {
  initData: { first: number; favorites: number[]; isLocalStorage: boolean };
};
const Single: React.FC<Props> = ({ initData }) => {
  // 学生番号関係が更新されたらURLを更新する関数
  const updateUrl = () => {
    // URLを更新
    const result = changeYearNo(studentNo);
    const newUrl = pracData[pracIndex].makeUrl(
      result.year,
      result.no,
      pracDetail
    );
    setUrl(newUrl);
  };

  // -------- ここからステートの変数宣言
  const [url, setUrl] = useState<string>(''); // URLを格納

  // 現在の情報ステータス
  const [studentNo, setStudentNo] = useState<number>(initData.first);

  // 課題の種類[Webコン、Java, ﾏﾙｳｪｱ]
  const [pracIndex, setPracIndex] = useState<number>(0);

  // 課題番号[EX01,EX02...]
  const [pracDetail, setPracDetail] = useState<number>(0);

  // 学生番号が更新されたら処理を実行
  useEffect(updateUrl, [studentNo, pracIndex, pracDetail]);

  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

  // iframeのステータス
  const [iframeStatus, setIframeStaus] = useState<IframeStatus>({
    width: 0,
    height: 0,
    isObstacle: false,
  });

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
    if (initData.isLocalStorage) {
      if (typeof window === 'undefined') return;

      const currentFirst = localStrage.getFirst() || 20216050;
      // 初期の学生番号をここで更新
      setStudentNo(currentFirst);
    }

    updateUrl();
    // eslint-disable-next-line
  }, []);

  // iframeの表示、非表示
  const iframeVisible = (bool: boolean) => {
    const newIframeStatus: IframeStatus = { ...iframeStatus, isObstacle: bool };
    setIframeStaus(newIframeStatus);
  };

  return (
    <div>
      <div className="iframe">
        <iframe
          src={url}
          width={iframeStatus?.width}
          height={iframeStatus?.height}
          id="iframe__single"
          style={{ scale: iframeStatus.scale ? iframeStatus.scale : 1 }}
          className={iframeStatus?.isObstacle ? 'obstacle' : ''}
        ></iframe>
      </div>

      <div className="single__footer">
        <DialogMenu
          onClose={buttonClose}
          onSelect={() => handleSelect(0)}
          isVisible={selectDialog === 0}
        />
        <div className="single__footer__right">
          <div className="single__footer__right__buttonContainer">
            <DialogNo
              initData={initData}
              onClose={buttonClose}
              onSelect={() => handleSelect(1)}
              isVisible={selectDialog === 1}
              studentNo={studentNo}
              onStudentNo={setStudentNo}
              onAddMessage={(message) => setMessage(message)}
              iframeVisible={iframeVisible}
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

            <DialogResponsive
              onClose={buttonClose}
              onSelect={() => handleSelect(4)}
              isVisible={selectDialog === 4}
              onAddMessage={(message) => setMessage(message)}
              iframeStatus={iframeStatus}
              setIframeStatus={setIframeStaus}
            />
          </div>
        </div>
      </div>
      <DialogMessage arrMessage={arrMessage} />
    </div>
  );
};

export default Single;
