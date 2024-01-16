import styles from './DialogContainer.module.scss';

interface DialogContainerProps {
  children?: React.ReactNode;
  onClose: () => void;
  isVisible: boolean;
}

const DialogContainer: React.FC<DialogContainerProps> = ({
  children,
  onClose,
  isVisible,
}) => {
  return (
    <div
      className={`${styles.dialog} ${!isVisible && styles.disabled}`}
      onClick={onClose}
    >
      <div
        className={styles.dialog__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default DialogContainer;
