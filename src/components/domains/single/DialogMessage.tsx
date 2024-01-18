'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/single/singleSlice';
import styles from '@/components/domains/single/DialogMessage.module.scss';

export const DialogMessage = () => {
  const arrMessage = useSelector((state: RootState) => state.data.arrMessage);
  const [arrClick, setArrClick] = useState<number[]>([]);

  const handleClick = (num: number) => {
    setArrClick([...arrClick, num]);
  };

  return (
    <div className={styles.dialog__message}>
      {arrMessage.map((v, index) => {
        const isClick = arrClick.find((v) => v === index) !== undefined;
        return (
          <div key={index} className={isClick ? styles.disabled : ''}>
            <p>{v}</p>
            <span onClick={() => handleClick(index)}>x</span>
          </div>
        );
      })}
    </div>
  );
};
