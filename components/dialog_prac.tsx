import { pracData } from "../features/update";

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
  onPracIndex(num: number): void;
  onPracDetail(num: number): void;
  pracIndex: number;
  pracDetail: number;
};

const DialogPrac = (props: Props) => {
  const isVisible = props.isVisible;

  const handlePracChange = (bool: boolean, index: number) => {
    if (!bool) return;
    props.onPracIndex(index);
    props.onPracDetail(0);
  };
  const handleDetailChange = (bool: boolean, index: number) => {
    if (!bool) return;
    props.onPracDetail(index);
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
                    checked={props.pracIndex === index}
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
            {pracData[props.pracIndex].pracs.map((v, index) => {
              return (
                <span key={index}>
                  <input
                    type="radio"
                    name="dialog__prac__detail"
                    id={"dialog__prac__detail__" + index}
                    onChange={(e) =>
                      handleDetailChange(e.target.checked, index)
                    }
                    checked={props.pracDetail === index}
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
          <span>{pracData[props.pracIndex].mini}</span>
          <span>{pracData[props.pracIndex].pracs[props.pracDetail].name}</span>
        </button>
        <span>講義・課題</span>
      </div>
    </>
  );
};
export default DialogPrac;
