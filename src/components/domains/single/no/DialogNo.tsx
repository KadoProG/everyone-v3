import { useSelector } from 'react-redux';
import { RootState } from '@/app/single/singleSlice';
import { DialogBottomButton } from '@/components/commons/DialogBottomButton';
import { DialogContainer } from '@/components/commons/DialogContainer';
import styles from '@/components/domains/single/no/DialogNo.module.scss';
import { DialogNoDetail } from '@/components/domains/single/no/DialogNoDetail';
import { DialogNoFavorite } from '@/components/domains/single/no/DialogNoFavorite';
import DialogNoRight from '@/components/domains/single/no/DialogNoRight';
import { changeYearNo } from '@/utils/change';

type Props = {
  onClose(): void; // ウィンドウを閉じる
  onSelect(): void; // ウィンドウを選択
  isVisible: boolean; // 表示するか否か
};

// 学生番号のダイアログ
export const DialogNo: React.FC<Props> = ({ isVisible, onClose, onSelect }) => {
  const { studentNo } = useSelector((state: RootState) => state.data);

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

      <DialogBottomButton
        bottomLabel="学年・学生番号"
        mainText={
          <>
            <span>{changeYearNo(studentNo).yearJPN}</span>
            <span>{studentNo.toString().slice(-4)}</span>
          </>
        }
        onClick={onSelect}
      />
    </>
  );
};
