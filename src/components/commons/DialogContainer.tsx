import styles from '@/components/commons/DialogContainer.module.scss';

interface DialogContainerProps {
  children?: React.ReactNode;
  onClose: () => void;
  isVisible: boolean;
  className?: string;
}

export const DialogContainer: React.FC<DialogContainerProps> = ({
  children,
  onClose,
  isVisible,
  className,
}) => {
  return (
    <div
      className={`${styles.dialog} ${!isVisible ? styles.disabled : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.dialog__content} ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
