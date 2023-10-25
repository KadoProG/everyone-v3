"use client";
import { useState } from "react";
import "../public/css/dialog.scss";

type Props = {
  arrMessage: string[];
};
const DialogMessage = (props: Props) => {
  const arrMessage = props.arrMessage;
  const [arrClick, setArrClick] = useState<number[]>([]);

  const handleClick = (num: number) => {
    setArrClick([...arrClick, num]);
  };
  return (
    <div className="dialog__message">
      {arrMessage.map((v, index) => {
        const isClick = arrClick.find((v) => v === index) !== undefined;
        return (
          <div key={index} className={isClick ? "disabled" : ""}>
            <p>{v}</p>
            <span onClick={() => handleClick(index)}>x</span>
          </div>
        );
      })}
    </div>
  );
};

export default DialogMessage;
