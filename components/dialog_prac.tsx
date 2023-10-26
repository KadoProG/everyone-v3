import { useState } from "react";

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

const DialogPrac = (props: Props) => {
  const isVisible = props.isVisible;
  const [selectPrac, setSelectPrac] = useState<number>(0);
  const [selectDetail, setSelectDetail] = useState<number>(0);

  const pracData = [
    {
      title: "Webコンテンツ及び演習",
      mini: "Webｺﾝﾃﾝﾂ",
      base: "https://www.cse.ce.nihon-u.ac.jp/webcon/",
      pracs: [
        { name: "INDEX", path: "" },
        { name: "課題01", path: "EX01.html" },
        { name: "課題02", path: "EX02.html" },
        { name: "課題03", path: "EX03.html" },
        { name: "課題04", path: "EX04.html" },
        { name: "課題05", path: "EX05.html" },
        { name: "課題06", path: "EX06.html" },
        { name: "課題07", path: "EX07.html" },
        { name: "課題08", path: "EX08.html" },
        { name: "課題09", path: "EX09.html" },
        { name: "課題10", path: "EX10.html" },
        { name: "課題11", path: "EX11.html" },
        { name: "課題12", path: "EX12.html" },
        { name: "課題13", path: "EX13.html" },
        { name: "課題14", path: "EX14.html" },
      ],
    },
    {
      title: "WWWとJava及び演習",
      mini: "",
      base: "https://java.cse.ce.nihon-u.ac.jp/",
      pracs: [{ name: "課題14", path: "EX14.html" }],
    },
    {
      title: "マルチメディア",
      mini: "",
      base: "https://www.cse.ce.nihon-u.ac.jp/webcon/",
      pracs: [{ name: "課題14", path: "EX14.html" }],
    },
  ];

  const handlePracChange = (bool: boolean, index: number) => {
    if (!bool) return;
    setSelectPrac(index);
    setSelectDetail(0);
  };
  const handleDetailChange = (bool: boolean, index: number) => {
    if (!bool) return;
    setSelectDetail(index);
  };

  return (
    <>
      <div
        className={`dialog${isVisible ? "" : " disabled"}`}
        onClick={props.onClose}
      >
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p>
            <b>授業を選ぶ</b>
          </p>
          <div className="prac">
            {pracData.map((v, index) => {
              return (
                <span key={index}>
                  <input
                    type="radio"
                    name="dialog__prac"
                    id={"dialog__prac__" + index}
                    checked={selectPrac === index}
                    onChange={(e) => handlePracChange(e.target.checked, index)}
                  />
                  <label htmlFor={"dialog__prac__" + index}>{v.title}</label>
                </span>
              );
            })}
          </div>
          <p>
            <b>課題を選ぶ</b>
          </p>
          <div className="prac detail">
            {pracData[selectPrac].pracs.map((v, index) => {
              return (
                <span key={index}>
                  <input
                    type="radio"
                    name="dialog__prac__detail"
                    id={"dialog__prac__detail__" + index}
                    onChange={(e) =>
                      handleDetailChange(e.target.checked, index)
                    }
                    checked={selectDetail === index}
                  />
                  <label htmlFor={"dialog__prac__detail__" + index}>
                    {v.name}
                  </label>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={props.onSelect}>
          <span>Webｺﾝﾃﾝﾂ</span>
          <span>INDEX</span>
        </button>
        <span>講義・課題</span>
      </div>
    </>
  );
};
export default DialogPrac;
