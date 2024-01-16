import { useDispatch, useSelector } from 'react-redux';
import PanelNo from '../../panel_no';
import { RootState, setStudentNo } from '../../../app/single/singleSlice';
import { changeStudentNo, changeYearNo } from '../../../features/pracData';
import styles from './DialogNoDetail.module.scss';

const DialogNoDetail = () => {
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
        className="year"
        displayEnText="年度"
      />

      <PanelNo no={no} onChangeNo={onNo} className="num" />
    </div>
  );
};

export default DialogNoDetail;
