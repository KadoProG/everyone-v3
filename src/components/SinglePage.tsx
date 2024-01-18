'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/single/singleSlice';
import { DialogMenu } from '@/components/DialogMenu';
import { DialogMessage } from '@/components/DialogMessage';
import { DialogPrac } from '@/components/single/DialogPrac';
import { DialogResponsive } from '@/components/single/DialogResponsive';
import { DialogSite } from '@/components/single/DialogSite';
import { DialogNo } from '@/components/single/no/DialogNo';
import styles from '@/components/Single.module.scss';

export const SinglePage: React.FC = () => {
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
      <div className={styles.iframe}>
        <iframe
          src={url}
          width={iframeStatus.width}
          height={iframeStatus.height}
          id="iframe__single"
          style={{ scale: iframeStatus.scale ? iframeStatus.scale : 1 }}
          className={iframeStatus.isObstacle ? 'obstacle' : ''}
        ></iframe>
      </div>

      <div className={styles.single__footer}>
        <DialogMenu
          onClose={buttonClose}
          onSelect={() => handleSelect(0)}
          isVisible={selectDialog === 0}
        />
        <div className={styles.single__footer__right}>
          <div className={styles.single__footer__right__buttonContainer}>
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
