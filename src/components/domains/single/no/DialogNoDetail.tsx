import { useDispatch, useSelector } from 'react-redux';
import { RootState, setStudentNo } from '@/app/single/singleSlice';
import { PanelNo } from '@/components/commons/PanelNo';
import styles from '@/components/domains/single/no/DialogNoDetail.module.scss';
import { changeStudentNo, changeYearNo } from '@/utils/change';

export const DialogNoDetail = () => {
  // 学生番号を取得
  const studentNo = useSelector((state: RootState) => state.data.studentNo);
  const dispatch = useDispatch();
  const { year, no } = changeYearNo(studentNo);

  // 学生番号が変更されたときの処理「年度」
  const onYear = (year: number) => {
    const newYearNo = changeYearNo(studentNo);
    dispatch(setStudentNo(changeStudentNo(year, newYearNo.no)));
  };

  // 学生番号が変更されたときの処理「番号」
  const onNo = (no: number) => {
    const newYearNo = changeYearNo(studentNo);
    dispatch(setStudentNo(changeStudentNo(newYearNo.year, no)));
  };

  return (
    <div className={styles.left}>
      <PanelNo
        no={year}
        onChangeNo={onYear}
        classType="year"
        displayEnText="年度"
      />

      <PanelNo no={no} onChangeNo={onNo} classType="num" />
    </div>
  );
};
