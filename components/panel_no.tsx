import Image from 'next/image';
import '../public/css/panel_no.scss';

type Props = {
  no: number;
  onChangeNo(no: number): void;
  className?: string;
  displayEnText?: string;
};
const PanelNo = (props: Props) => {
  const className = props.className ? props.className : 'no';
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
    <section className={`panel_no ${className}`}>
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
export default PanelNo;

type ButtonArrowProps = {
  onClick(): void;
};

// 矢印ボタンのみコンポーネント化
const ButtonArrow = (props: ButtonArrowProps) => {
  return (
    <button onClick={props.onClick}>
      <Image src="/images/mark_left.svg" width={20} height={20} alt="左矢印" />
    </button>
  );
};
