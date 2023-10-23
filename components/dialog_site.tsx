import Image from "next/image";
import "../public/css/panel_no.scss";
type Props = {
  onClose(): void;
  onChangeUrl(url: string): void;
  url: string;
  isVisible: boolean;
};

const DialogSite = (props: Props) => {
  const visibleClassName = !props.isVisible ? " dialog__disabled" : "";

  const className = "dialog__overlay" + visibleClassName;

  return (
    <div className={className} onClick={props.onClose}>
      <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
        <p>
          <b>URL</b>
        </p>
        <section>
          <textarea
            cols={100}
            rows={4}
            value={props.url}
            onChange={(e) => props.onChangeUrl(e.target.value)}
          ></textarea>
        </section>
        <p>
          <b>機能</b>
        </p>
        <section className="dialog__content__site__buttons">
          <button>
            <span>URL</span>
            <span>リセット</span>
          </button>
          <button>
            <Image src="/images/reload.svg" width={20} height={20} alt="更新" />
          </button>
          <button>
            <Image
              src="/images/copy_icon.svg"
              width={20}
              height={20}
              alt="コピー"
            />
          </button>
          <button>
            <Image
              src="/images/externalLink_icon.svg"
              width={20}
              height={20}
              alt="新しいタブ"
            />
          </button>
        </section>
        <div className="dialog__content__no">
          {/* <div>
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
          </div> */}
          {/* <div className="dialog__content__no__right">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default DialogSite;
