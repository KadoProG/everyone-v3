import styles from '@/components/commons/DialogSectionTitle.module.scss';

interface DialogSectionTitleProps {
  label: string;
  rightContent?: React.ReactNode;
}

export const DialogSectionTitle: React.FC<DialogSectionTitleProps> = (
  props
) => (
  <p className={styles.p}>
    <b>{props.label}</b>
    {props.rightContent}
  </p>
);
