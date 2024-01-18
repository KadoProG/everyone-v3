import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setPracDetail,
  setPracIndex,
} from '@/app/single/singleSlice';
import { Button } from '@/components/commons/Button';
import { DialogBottomButton } from '@/components/commons/DialogBottomButton';
import { DialogContainer } from '@/components/commons/DialogContainer';
import { DialogSectionTitle } from '@/components/commons/DialogSectionTitle';
import styles from '@/components/domains/single/DialogPrac.module.scss';
import pracData from '@/utils/pracData';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

export const DialogPrac = (props: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const pracIndex = data.pracIndex;
  const pracDetail = data.pracDetail;

  const handlePracChange = (index: number) => {
    dispatch(setPracIndex(index));
  };
  const handleDetailChange = (index: number) => {
    dispatch(setPracDetail(index));
  };

  return (
    <>
      <DialogContainer isVisible={props.isVisible} onClose={props.onClose}>
        <DialogSectionTitle label="授業を選ぶ" />
        <div className={styles.prac}>
          {pracData.map((v, index) => (
            <Button
              key={index}
              label={v.title}
              checked={pracIndex === index}
              onClick={() => handlePracChange(index)}
            />
          ))}
        </div>
        <DialogSectionTitle label="課題を選ぶ" />
        <div className={`{${styles.prac} '${styles.detail}`}>
          {pracData[pracIndex].pracs.map((v, index) => (
            <Button
              key={index}
              label={v.name}
              checked={pracDetail === index}
              onClick={() => handleDetailChange(index)}
            />
          ))}
        </div>
      </DialogContainer>

      <DialogBottomButton
        bottomLabel="講義・課題"
        onClick={props.onSelect}
        mainText={
          <>
            <span>{pracData[pracIndex].mini}</span>
            <span>{pracData[pracIndex].pracs[pracDetail].name}</span>
          </>
        }
      />
    </>
  );
};
