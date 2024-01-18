import Link from 'next/link';
import styles from '@/components/domains/home/HomeFooter.module.scss';

export const HomeFooter = () => {
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
    <footer className={styles.footer}>
      <nav>
        <ul>
          {menuItems.map((v, index) => {
            const strTarget = v.ex ? '_blank' : '_self';
            return (
              <li key={index}>
                <Link href={v.link} target={strTarget}>
                  {v.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <p className={styles.copyright}>&copy; KadoBloG 2023</p>
    </footer>
  );
};
