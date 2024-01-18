/**
 * 西暦＋下3桁の番号→学生番号に変換
 * @param year 西暦
 * @param no 下3桁の番号
 * @returns 学生番号
 */
export const changeStudentNo = (year: number, no: number): number => {
  const strNo = no < 0 ? ('000' + 1).slice(-3) : ('000' + no).slice(-3);
  const numYear = year < 2020 ? ('00' + (year - 1988)).slice(-2) : year;

  return parseInt(numYear + '6' + strNo);
};

/**
 * 学生番号→西暦＋下3桁の番号に変換
 * @param studentNo 学生番号
 * @returns year: 西暦 no: 番号（下3桁）
 */
export const changeYearNo = (
  studentNo: number
): { year: number; no: number; yearJPN: number } => {
  const strNo = String(studentNo).slice(-3); // 下3桁
  const no = isNaN(parseInt(strNo)) ? 0 : parseInt(strNo);

  const strYear = String(studentNo).slice(0, -4); // 上2~4桁(下4桁を除く数)

  const numYear = isNaN(parseInt(strYear)) ? 0 : parseInt(strYear);
  const year = strYear.length <= 2 ? numYear + 1988 : numYear;

  const yearJPN =
    year < 2020 ? parseInt(('00' + (year - 1988)).slice(-2)) : year;

  return { year, no, yearJPN };
};
