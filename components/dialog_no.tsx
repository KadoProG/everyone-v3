import Image from "next/image";
import "../public/css/panel_no.scss";
type Props = {
  onClose(): void;
  onPrevNo(): void;
  onNextNo(): void;
  onPrevYear(): void;
  onNextYear(): void;
  isVisible: boolean;
  changeNo(num: number): void;
  no: number;
  year: number;
};

const DialogNo = (props: Props) => {
  const visibleClassName = !props.isVisible ? " dialog__disabled" : "";
  const handleNextClick = () => {};

  const className = "dialog__overlay" + visibleClassName;

  const handleNoChange = (value: string) => {
    const num = parseInt(value);
    props.changeNo(num);
  };

  return (
    <div className={className} onClick={props.onClose}>
      <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
        <p>
          <b>お気に入り</b>
        </p>

        <p>ここにダイアログの内容を追加します。</p>
        <p>
          <b>学生番号</b>
        </p>
        <div className="dialog__content__no">
          <div>
            <section className="dialog__content-year">
              <button
                className="dialog__content__panel"
                onClick={props.onPrevYear}
              >
                <Image
                  src="/images/mark_left.svg"
                  width={20}
                  height={20}
                  alt="左矢印"
                />
              </button>
              <span className="dialog__content__panel">{props.year}年度</span>
              <button
                className="dialog__content__panel"
                onClick={props.onNextYear}
              >
                <Image
                  src="/images/mark_left.svg"
                  width={20}
                  height={20}
                  alt="左矢印"
                />
              </button>
            </section>
            <section className="dialog__content-num">
              <button
                className="dialog__content__panel"
                onClick={props.onPrevNo}
              >
                <Image
                  src="/images/mark_left.svg"
                  width={20}
                  height={20}
                  alt="左矢印"
                />
              </button>
              <input
                type="text"
                className="dialog__content__panel"
                value={props.no}
                onChange={(e) => handleNoChange(e.target.value)}
              />
              <button
                className="dialog__content__panel"
                onClick={props.onNextNo}
              >
                <Image
                  src="/images/mark_left.svg"
                  width={20}
                  height={20}
                  alt="左矢印"
                />
              </button>
            </section>
          </div>
          <div className="dialog__content__no__right">
            <section>
              <Image
                src="/images/star_icon.svg"
                width={24}
                height={24}
                alt="星"
              />
            </section>
            <section className="flex" onClick={handleNextClick}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">次回最初に表示する</label>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DialogNo;
