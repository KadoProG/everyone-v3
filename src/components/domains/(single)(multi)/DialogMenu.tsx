import Link from 'next/link';
import { DialogContainer } from '@/components/commons/DialogContainer';
import styles from '@/components/domains/(single)(multi)/DialogMenu.module.scss';

type Props = {
  onClose(): void;
  onSelect(): void;
  isVisible: boolean;
};

export const DialogMenu = (props: Props) => {
  const menuItems = [
    { link: '/', title: 'HOMEに戻る', ex: false },
    {
      link: 'https://fast5-blog.com/html-product/uni-web/',
      title: 'Kadoのサイトに戻る',
      ex: false,
    },
    {
      link: 'https://sub3.fast5-blog.com',
      title: 'NextJSの仮ポートフォリオ',
      ex: true,
    },
    {
      link: 'https://x.com/KadoUniversity',
      title: 'X [@KadoUniversity]',
      ex: true,
    },
    {
      link: 'https://github.com/KadoProG',
      title: 'GitHub [KadoProG]',
      ex: true,
    },
  ];

  return (
    <>
      <DialogContainer
        onClose={props.onClose}
        isVisible={props.isVisible}
        className={styles.menu}
      >
        {menuItems.map((v, index) => {
          const strTarget = v.ex ? '_blank' : '_self';
          return (
            <Link href={v.link} key={index} target={strTarget}>
              {v.title}
            </Link>
          );
        })}
        <p className={styles.copyright}>&copy; KadoBloG 2023</p>
      </DialogContainer>
      <button
        className={styles.single__footer__left}
        onClick={props.onSelect}
        aria-label="MENUボタン"
      >
        <span className={props.isVisible ? styles.checked : ''}></span>
      </button>
    </>
  );
};
