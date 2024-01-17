import '../../../public/css/dialog_no.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/single/singleSlice';
import DialogContainer from '../../commons/DialogContainer';
import styles from './DialogNo.module.scss';
import DialogNoDetail from './DialogNoDetail';
import DialogNoFavorite from './DialogNoFavorite';
import DialogNoRight from './DialogNoRight';

type Props = {
  onClose(): void; // ウィンドウを閉じる
  onSelect(): void; // ウィンドウを選択
  isVisible: boolean; // 表示するか否か
};

// 学生番号のダイアログ
const DialogNo: React.FC<Props> = ({ isVisible, onClose, onSelect }) => {
  const data = useSelector((state: RootState) => state.data);

  const studentNo = data.studentNo;

  return (
    <>
      <DialogContainer isVisible={isVisible} onClose={onClose}>
        <DialogNoFavorite />
        <p>
          <b>学生番号</b>
        </p>
        <div className={styles.no}>
          <DialogNoDetail />
          <DialogNoRight />
        </div>
      </DialogContainer>

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
