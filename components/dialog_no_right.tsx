import Image from 'next/image';
import {
  RootState,
  setCurrentFavorite,
  setCurrentFirst,
} from '../app/single/singleSlice';
import { useDispatch, useSelector } from 'react-redux';

// 学生番号ダイアログ>>学生番号操作>>右側の「お気に入り」「最初に表示」ボタンのコンポーネント
const DialogNoRight: React.FC = () => {
  //
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const isFavorite = data.favorites.includes(data.studentNo);
  const isFirst = data.first === data.studentNo;

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
        onChange={(e) => dispatch(setCurrentFavorite(e.target.checked))}
      />
      <label htmlFor="dialog__content__no__favorite">
        <Image src={imagePath} width={24} height={24} alt="星" />
        <span>お気に入り</span>
      </label>
      <input
        type="checkbox"
        id="dialog__no__checkbox"
        checked={isFirst}
        onChange={(e) => dispatch(setCurrentFirst(e.target.checked))}
      />
      <label htmlFor="dialog__no__checkbox">次回最初に表示</label>
    </div>
  );
};

export default DialogNoRight;
