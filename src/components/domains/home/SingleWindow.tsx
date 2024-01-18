import styles from '@/components/domains/home/SingleWindow.module.scss';
import { SmallContents } from '@/components/domains/home/SmallContents';

type Props = {
  className?: string;
  animation?: boolean;
};

export const SingleWindow = (props: Props) => {
  const className = props.className ? ' ' + props.className : '';
  const isAnimation = props.animation ? props.animation : false;

  const classAnimationName = isAnimation ? styles.singleWindowAnimation : '';

  const resultClassName =
    styles.singleWindow + ' ' + className + ' ' + classAnimationName;
  return (
    <div className={resultClassName}>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <SmallContents />
      </div>
    </div>
  );
};
