'use client';
import Image from 'next/image';
import '../public/css/dialog_no.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIframeStatus } from '../app/single/singleSlice';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

const DialogResponsive = (props: Props) => {
  const [range, setRange] = useState<string>('');
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const iframeStatus = data.iframeStatus;

  const path =
    parseInt(range) < 479
      ? '/images/smartphone_icon.svg'
      : parseInt(range) < 767
        ? '/images/tablet_icon.svg'
        : '/images/laptopPC_icon.svg';

  const onRange = (value: string) => {
    setRange(value);

    const isScaled = innerWidth < parseInt(value);
    const scale = isScaled ? innerWidth / parseInt(value) : 1;

    const height = isScaled ? (innerHeight - 60) / scale : innerHeight - 60;

    dispatch(
      setIframeStatus({
        ...iframeStatus,
        width: parseInt(value),
        scale: scale,
        height: height,
      })
    );
  };

  // 起動時実行（DOM操作あり）
  useEffect(() => {
    onRange(String(innerWidth));
    window.addEventListener('resize', () => {
      onRange(String(innerWidth));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <div
        className={`dialog${!props.isVisible ? ' disabled' : ''}`}
        onClick={props.onClose}
      >
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p className="favoriteP">
            カスタム
            <input
              type="number"
              value={range}
              onChange={(e) => onRange(e.target.value)}
            />
          </p>
          <div className="site">
            <input
              type="range"
              value={range}
              min={200}
              max={5000}
              onChange={(e) => onRange(e.target.value)}
            />
          </div>
          <p>
            <b>メディアクエリ</b>
          </p>
          <div className="site">
            <button onClick={() => onRange('380')}>
              <Image
                src="/images/smartphone_icon.svg"
                width={20}
                height={20}
                alt="スマホ"
              />
            </button>
            <button onClick={() => onRange('600')}>
              <Image
                src="/images/tablet_icon.svg"
                width={20}
                height={20}
                alt="タブレット"
              />
            </button>
            <button onClick={() => onRange('1260')}>
              <Image
                src="/images/laptopPC_icon.svg"
                width={20}
                height={20}
                alt="ノートPC"
              />
            </button>
            <button onClick={() => onRange(String(innerWidth))}>
              <span>リセット</span>
            </button>
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={props.onSelect}>
          <Image src={path} width={26} height={26} alt="画像" />
        </button>
        <span>ﾚｽﾎﾟﾝｼﾌﾞ</span>
      </div>
    </>
  );
};
export default DialogResponsive;
