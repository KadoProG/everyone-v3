import Image from 'next/image';
import '../public/css/dialog_site.scss';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
  onAddMessage(message: string): void;
  onChangeUrl(url: string): void;
  url: string;
};

const DialogSite = (props: Props) => {
  // クラス名を反映
  const visibleClassName = !props.isVisible ? ' disabled' : '';
  const className = 'dialog' + visibleClassName;

  // 再読み込み
  const handleReload = () => {
    const url = props.url;
    props.onChangeUrl('');
    setTimeout(() => {
      props.onChangeUrl(url);
    }, 20);
    // メッセージを送信
    props.onAddMessage('Success: iframeを更新しました');
  };

  // クリップボードへコピー（コピーの処理）
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.url).then(function () {});
    } else {
      const textarea = document.getElementById('textarea');
      if (textarea === null) return;
      textarea.focus();
      document.execCommand('copy');
      textarea.blur();
    }
    // メッセージを送信
    props.onAddMessage('Success: グリップボードにコピーしました');
  };

  // 新しいタブで開く
  const handleExternalClick = () => {
    window.open(props.url);
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
              value={props.url}
              onChange={(e) => props.onChangeUrl(e.target.value)}
            ></textarea>
          </section>
          <p>
            <b>機能</b>
          </p>
          <section className="site">
            <button>
              <span>URL</span>
              <span>リセット</span>
            </button>
            <button onClick={handleReload}>
              <Image
                src="/images/reload.svg"
                width={20}
                height={20}
                alt="更新"
              />
            </button>
            <button onClick={copyToClipboard}>
              <Image
                src="/images/copy_icon.svg"
                width={20}
                height={20}
                alt="コピー"
              />
            </button>
            <button onClick={handleExternalClick}>
              <Image
                src="/images/externalLink_icon.svg"
                width={20}
                height={20}
                alt="新しいタブ"
              />
            </button>
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
