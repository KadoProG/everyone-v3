'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIframeStatus } from '@/app/single/singleSlice';
import { Button } from '@/components/commons/Button';
import { DialogBottomButton } from '@/components/commons/DialogBottomButton';
import { DialogContainer } from '@/components/commons/DialogContainer';
import { DialogSectionTitle } from '@/components/commons/DialogSectionTitle';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

export const DialogResponsive: React.FC<Props> = (props) => {
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
      <DialogContainer isVisible={props.isVisible} onClose={props.onClose}>
        <DialogSectionTitle
          label="カスタム"
          rightContent={
            <input
              type="number"
              value={range}
              onChange={(e) => onRange(e.target.value)}
            />
          }
        />
        <section>
          <input
            type="range"
            value={range}
            min={200}
            max={5000}
            onChange={(e) => onRange(e.target.value)}
            style={{ width: '100%' }}
          />
        </section>

        <DialogSectionTitle label="メディアクエリ" />
        <div>
          <Button
            onClick={() => onRange('380')}
            label={
              <Image
                src="/images/smartphone_icon.svg"
                width={20}
                height={20}
                alt="スマホ"
              />
            }
          />
          <Button
            onClick={() => onRange('600')}
            label={
              <Image
                src="/images/tablet_icon.svg"
                width={20}
                height={20}
                alt="タブレット"
              />
            }
          />
          <Button
            onClick={() => onRange('1260')}
            label={
              <Image
                src="/images/laptopPC_icon.svg"
                width={20}
                height={20}
                alt="ノートPC"
              />
            }
          />
          <Button
            onClick={() => onRange(String(innerWidth))}
            label={<span>リセット</span>}
          />
        </div>
      </DialogContainer>
      <DialogBottomButton
        bottomLabel="ﾚｽﾎﾟﾝｼﾌﾞ"
        imagePath={path}
        onClick={props.onSelect}
      />
    </>
  );
};
