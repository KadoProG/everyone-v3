import { changeStudentNo, changeYearNo } from "../features/update";
import PanelNo from "./panel_no";

type Props = {
  studentNo: number;
  onStudentNo(studentNo: number): void;
};
const DialogNoDetail = (props: Props) => {
  // 学生番号を取得
  const studentNo = props.studentNo;
  const { year, no } = changeYearNo(studentNo);

  // 学生番号が変更されたときの処理「年度」
  const onYear = (year: number) => {
    const newYearNo = changeYearNo(studentNo);
    props.onStudentNo(changeStudentNo(year, newYearNo.no));
  };

  // 学生番号が変更されたときの処理「番号」
  const onNo = (no: number) => {
    const newYearNo = changeYearNo(studentNo);
    props.onStudentNo(changeStudentNo(newYearNo.year, no));
  };

  return (
    <div className="left">
      <section className="year">
        <PanelNo
          no={year}
          onChangeNo={onYear}
          className="year"
          displayEnText="年度"
        />
      </section>

      <section className="num">
        <PanelNo no={no} onChangeNo={onNo} className="num" />
      </section>
    </div>
  );
};

export default DialogNoDetail;
