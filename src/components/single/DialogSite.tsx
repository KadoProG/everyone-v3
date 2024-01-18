import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, pushArrMessage, setUrl } from '@/app/single/singleSlice';
import { Button } from '@/components/commons/Button';
import { DialogBottomButton } from '@/components/commons/DialogBottomButton';
import { DialogContainer } from '@/components/commons/DialogContainer';
import { DialogSectionTitle } from '@/components/commons/DialogSectionTitle';
import styles from '@/components/single/DialogSite.module.scss';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

export const DialogSite = (props: Props) => {
  // クラス名を反映
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.data);
  const url = data.url;

  // 再読み込み
  const handleReload = () => {
    const tempUrl = url;
    dispatch(setUrl(''));
    setTimeout(() => {
      dispatch(setUrl(tempUrl));
      // メッセージを送信
      dispatch(pushArrMessage('Success: iframeを更新しました'));
    }, 20);
  };

  // クリップボードへコピー（コピーの処理）
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {});
    } else {
      const textarea = document.getElementById('textarea');
      if (textarea === null) return;
      textarea.focus();
      document.execCommand('copy');
      textarea.blur();
    }
    // メッセージを送信
    dispatch(pushArrMessage('Success: グリップボードにコピーしました'));
  };

  // 新しいタブで開く
  const handleExternalClick = () => {
    window.open(url);
  };

  return (
    <>
      <DialogContainer isVisible={props.isVisible} onClose={props.onClose}>
        <DialogSectionTitle label="URL" />
        <section className={styles.site}>
          <textarea
            id="textarea"
            cols={100}
            rows={4}
            value={url}
            onChange={(e) => dispatch(setUrl(e.target.value))}
          ></textarea>
        </section>
        <p>
          <b>機能</b>
        </p>
        <section className={styles.site}>
          <Button
            disabled={true}
            label={
              <>
                <span>URL</span>
                <span>リセット</span>
              </>
            }
          ></Button>
          <OriginImageButton
            event={handleReload}
            imageUrl="/images/reload.svg"
            alt="更新"
          />
          <OriginImageButton
            event={copyToClipboard}
            imageUrl="/images/copy_icon.svg"
            alt="コピー"
          />
          <OriginImageButton
            event={handleExternalClick}
            imageUrl="/images/externalLink_icon.svg"
            alt="新しいタブ"
          />
        </section>
      </DialogContainer>

      <DialogBottomButton
        bottomLabel="サイト"
        onClick={props.onSelect}
        mainText="OK"
      />
    </>
  );
};

type ImageButtonProps = {
  imageUrl: string;
  alt: string;
  event: () => void;
};

const OriginImageButton = (props: ImageButtonProps) => {
  return (
    <Button
      onClick={props.event}
      label={
        <Image src={props.imageUrl} width={20} height={20} alt={props.alt} />
      }
    ></Button>
  );
};
