import Image from 'next/image';
import styles from '@/components/commons/PanelNo.module.scss';

/**
 * ClassNameの設定だが、高さや大きさが変更される
 */
const classes = {
  /**
   * 学年専用
   */
  year: styles.year,
  /**
   * 学生番号（下3桁）専用
   */
  num: styles.num,
  /**
   * マルチ専用
   */
  no: styles.no,
};

type PanelNoProps = {
  no: number;
  onChangeNo(no: number): void;
  classType?: keyof typeof classes;
  displayEnText?: string;
};

export const PanelNo = (props: PanelNoProps) => {
  const className = props.classType ? classes[props.classType] : classes.no;
  const displayEnText = props.displayEnText ? props.displayEnText : '';

  // 手書きでチェンジしたときの動作
  const handleNoChange = (value: string) => {
    if (value === displayEnText) {
      props.onChangeNo(0);
      return;
    }
    const num = parseInt(value.replace(displayEnText, ''));
    if (isNaN(num)) return;
    props.onChangeNo(num);
  };

  return (
    <section className={`${styles.panel_no} ${className}`}>
      <ButtonArrow onClick={() => props.onChangeNo(props.no - 1)} />
      <input
        type="text"
        value={props.no + displayEnText}
        onChange={(e) => handleNoChange(e.target.value)}
      />
      <ButtonArrow onClick={() => props.onChangeNo(props.no + 1)} />
    </section>
  );
};

type ButtonArrowProps = {
  onClick(): void;
};

// 矢印ボタンのみコンポーネント化
const ButtonArrow = (props: ButtonArrowProps) => (
  <button onClick={props.onClick}>
    <Image src="/images/mark_left.svg" width={20} height={20} alt="左矢印" />
  </button>
);
