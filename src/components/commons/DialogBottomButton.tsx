import Image from 'next/image';
import React from 'react';

import styles from '@/components/commons/DialogBottomButton.module.scss';
interface DialogBottomButtonProps {
  bottomLabel: string;
  mainText?: React.ReactNode;
  imagePath?: string;
  onClick: () => void;
}

export const DialogBottomButton: React.FC<DialogBottomButtonProps> = (
  props
) => (
  <div className={styles.button}>
    <button onClick={props.onClick}>
      {props.imagePath && (
        <Image src={props.imagePath} width={26} height={26} alt="画像" />
      )}
      {props.mainText && <span>{props.mainText}</span>}
    </button>
    <span>{props.bottomLabel}</span>
  </div>
);
