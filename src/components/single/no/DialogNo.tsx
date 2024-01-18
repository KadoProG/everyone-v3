import { useSelector } from 'react-redux';
import { RootState } from '@/app/single/singleSlice';
import { DialogBottomButton } from '@/components/commons/DialogBottomButton';
import { DialogContainer } from '@/components/commons/DialogContainer';
import styles from '@/components/single/no/DialogNo.module.scss';
import { DialogNoDetail } from '@/components/single/no/DialogNoDetail';
import { DialogNoFavorite } from '@/components/single/no/DialogNoFavorite';
import DialogNoRight from '@/components/single/no/DialogNoRight';

type Props = {
  onClose(): void; // ウィンドウを閉じる
  onSelect(): void; // ウィンドウを選択
  isVisible: boolean; // 表示するか否か
};

// 学生番号のダイアログ
export const DialogNo: React.FC<Props> = ({ isVisible, onClose, onSelect }) => {
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

      <DialogBottomButton
        bottomLabel="学年・学生番号"
        mainText={String(studentNo)}
        onClick={onSelect}
      />
    </>
  );
};
