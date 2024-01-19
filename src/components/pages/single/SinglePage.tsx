'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/single/singleSlice';
import { DialogMenu } from '@/components/domains/(single)(multi)/DialogMenu';
import { DialogMessage } from '@/components/domains/single/DialogMessage';
import { DialogPrac } from '@/components/domains/single/DialogPrac';
import { DialogResponsive } from '@/components/domains/single/DialogResponsive';
import { DialogSite } from '@/components/domains/single/DialogSite';
import { DialogNo } from '@/components/domains/single/no/DialogNo';
import styles from '@/components/pages/single/SinglePage.module.scss';

export const SinglePage: React.FC = () => {
  // 現在の情報ステータス
  const { url, iframeStatus, studentNo } = useSelector(
    (state: RootState) => state.data
  );

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
          title={`${studentNo}番のページ`}
          src={url}
          width={iframeStatus.width}
          height={iframeStatus.height}
          id="iframe__single"
          style={{ scale: iframeStatus.scale ? iframeStatus.scale : 1 }}
          className={iframeStatus.isObstacle ? styles.obstacle : ''}
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
