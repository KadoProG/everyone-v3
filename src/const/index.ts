import { changeStudentNo } from '@/utils/change';
import { getCurrentFiscalYear } from '@/utils/date';

/**
 * 初期表示の学生番号
 */
export const initStudentNo = changeStudentNo(getCurrentFiscalYear() - 1, 1);
