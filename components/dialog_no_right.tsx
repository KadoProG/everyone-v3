import Image from 'next/image';

type Props = {
  isFavorite: boolean; // お気に入り
  onIsFavorite(bool: boolean): void; // お気に入りを切り替え
  isFirst: boolean; // 最初に表示
  onIsFirst(bool: boolean): void; // 最初に表示を切り替え
};

// 学生番号ダイアログ>>学生番号操作>>右側の「お気に入り」「最初に表示」ボタンのコンポーネント
const DialogNoRight: React.FC<Props> = ({
  isFavorite,
  isFirst,
  onIsFavorite,
  onIsFirst,
}) => {
  // 画像パスを格納
  const imagePath = isFavorite
    ? '/images/star_blue_icon.svg'
    : '/images/star_icon.svg';

  return (
    <div className="right">
      <input
        type="checkbox"
        id="dialog__content__no__favorite"
        checked={isFavorite}
        onChange={(e) => onIsFavorite(e.target.checked)}
      />
      <label htmlFor="dialog__content__no__favorite">
        <Image src={imagePath} width={24} height={24} alt="星" />
        <span>お気に入り</span>
      </label>
      <input
        type="checkbox"
        id="dialog__no__checkbox"
        checked={isFirst}
        onChange={(e) => onIsFirst(e.target.checked)}
      />
      <label htmlFor="dialog__no__checkbox">次回最初に表示</label>
    </div>
  );
};

export default DialogNoRight;
