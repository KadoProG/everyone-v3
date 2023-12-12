'use client';

import { useState } from 'react';
import DialogMenu from './dialog_footer';
import DialogNo from './dialog_no';
import DialogPrac from './dialog_prac';
import DialogSite from './dialog_site';
import DialogResponsive from './dialog_responsive';
import DialogMessage from './dialog_message';
import { useSelector } from 'react-redux';
import { RootState } from '../app/single/singleSlice';

const Single: React.FC = () => {
  // 現在の情報ステータス
  const data = useSelector((state: RootState) => state.data);
  const url = data.url;
  const iframeStatus = data.iframeStatus;

  // ダイアログのINDEX
  const [selectDialog, setSelectDialog] = useState<number>(-1);

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

  return (
    <div>
      <div className="iframe">
        <iframe
          src={url}
          width={iframeStatus.width}
          height={iframeStatus.height}
          id="iframe__single"
          style={{ scale: iframeStatus.scale ? iframeStatus.scale : 1 }}
          className={iframeStatus.isObstacle ? 'obstacle' : ''}
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
              onClose={buttonClose}
              onSelect={() => handleSelect(1)}
              isVisible={selectDialog === 1}
            />

            <DialogPrac
              onClose={buttonClose}
              onSelect={() => handleSelect(2)}
              isVisible={selectDialog === 2}
            />

            <DialogSite
              isVisible={selectDialog === 3}
              onSelect={() => handleSelect(3)}
              onClose={buttonClose}
            />

            <DialogResponsive
              onClose={buttonClose}
              onSelect={() => handleSelect(4)}
              isVisible={selectDialog === 4}
            />
          </div>
        </div>
      </div>
      <DialogMessage />
    </div>
  );
};

export default Single;
