import Image from 'next/image';
import styles from '@/components/domains/single/no/DialogNoFavoriteToggle.module.scss';

interface DialogNoFavoriteToggleProps {
  isChecked: boolean;
  onClick: (bool: boolean) => void;
}

export const DialogNoFavoriteToggle: React.FC<DialogNoFavoriteToggleProps> = ({
  isChecked,
  onClick,
}) => (
  <div className={styles.favoriteSelect}>
    <div className={`${styles.desc} ${isChecked && styles.selected}`}>
      <div>
        <p>ﾛｰｶﾙｽﾄﾚｰｼﾞ</p>
      </div>
      <Image
        src={'/images/my_icon_chrome.png'}
        width={20}
        height={20}
        alt="Chrome"
      />
    </div>
    <div className={styles.toggle}>
      <input
        type="checkbox"
        id="favorite_select"
        checked={!isChecked}
        onChange={(e) => onClick(!e.target.checked)}
      />
      <label htmlFor="favorite_select"></label>
    </div>
    <div className={`${styles.desc} ${!isChecked && styles.selected}`}>
      <Image
        src={'/images/my_icon_github.png'}
        width={20}
        height={20}
        alt="GitHub"
      />
      <div>
        <p>Git連携</p>
      </div>
    </div>
  </div>
);
