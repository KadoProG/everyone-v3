import Image from 'next/image';
import '../../../public/css/dialog_site.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  pushArrMessage,
  setUrl,
} from '../../app/single/singleSlice';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

const DialogSite = (props: Props) => {
  // クラス名を反映
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.data);
  const url = data.url;

  const visibleClassName = !props.isVisible ? ' disabled' : '';
  const className = 'dialog' + visibleClassName;

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
      <div className={className} onClick={props.onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <p>
            <b>URL</b>
          </p>
          <section>
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
          <section className="site">
            <button disabled={true}>
              <span>URL</span>
              <span>リセット</span>
            </button>
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
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={props.onSelect}>OK</button>
        <span>サイト</span>
      </div>
    </>
  );
};
export default DialogSite;

type ImageButtonProps = {
  imageUrl: string;
  alt: string;
  event: () => void;
};

const OriginImageButton = (props: ImageButtonProps) => {
  return (
    <button onClick={props.event}>
      <Image src={props.imageUrl} width={20} height={20} alt={props.alt} />
    </button>
  );
};
