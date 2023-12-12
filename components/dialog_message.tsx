'use client';
import { useState } from 'react';
import '../public/css/dialog_message.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../app/single/singleSlice';

const DialogMessage = () => {
  const arrMessage = useSelector((state: RootState) => state.data.arrMessage);
  const [arrClick, setArrClick] = useState<number[]>([]);

  const handleClick = (num: number) => {
    setArrClick([...arrClick, num]);
  };

  return (
    <div className="dialog__message">
      {arrMessage.map((v, index) => {
        const isClick = arrClick.find((v) => v === index) !== undefined;
        return (
          <div key={index} className={isClick ? 'disabled' : ''}>
            <p>{v}</p>
            <span onClick={() => handleClick(index)}>x</span>
          </div>
        );
      })}
    </div>
  );
};

export default DialogMessage;
