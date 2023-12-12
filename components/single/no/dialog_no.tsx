import '../../../public/css/dialog_no.scss';
import DialogNoFavorite from './dialog_no_favorite';
import DialogNoDetail from './dialog_no_detail';
import DialogNoRight from './dialog_no_right';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/single/singleSlice';

type Props = {
  onClose(): void; // ウィンドウを閉じる
  onSelect(): void; // ウィンドウを選択
  isVisible: boolean; // 表示するか否か
};

// 学生番号のダイアログ
const DialogNo: React.FC<Props> = ({ isVisible, onClose, onSelect }) => {
  const data = useSelector((state: RootState) => state.data);

  const studentNo = data.studentNo;

  // クラス名を反映
  const className = 'dialog' + (!isVisible ? ' disabled' : '');

  return (
    <>
      <div className={className} onClick={onClose}>
        <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
          <DialogNoFavorite />
          <p>
            <b>学生番号</b>
          </p>
          <div className="no">
            <DialogNoDetail />
            <DialogNoRight />
          </div>
        </div>
      </div>
      <div className="single__footer__right__button">
        <button onClick={onSelect}>
          <span>{studentNo}</span>
        </button>
        <span>学年・学生番号</span>
      </div>
    </>
  );
};
export default DialogNo;
