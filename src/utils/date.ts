/**
 * 今年度（西暦）を求める関数
 * @returns 今年度（西暦）
 */
export const getCurrentFiscalYear = (): number => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const fiscalYearStartMonth = 4; // 例: 4月始まりの場合

  if (today.getMonth() + 1 < fiscalYearStartMonth) {
    // 今年度が始まっていない場合、前年が今の年度となります
    return currentYear - 1;
  } else {
    // 今年度が始まっている場合、今年が今の年度となります
    return currentYear;
  }
};
