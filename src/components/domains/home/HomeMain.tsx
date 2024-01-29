import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { MarkdownView } from '@/components/commons/MarkdownView';
import styles from '@/components/domains/home/HomeMain.module.scss';
import { SingleWindow } from '@/components/domains/home/SingleWindow';

export const HomeMain = async () => {
  const filePath = path.join(process.cwd(), 'src', 'md', 'home.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <main className={styles.main}>
      <div className={styles.main__title}>
        <h1>みんなの記事v3</h1>
        <p className={styles.main__title__date}>2023/10/21</p>
        <div className={styles.main__title__git}>
          <Image
            src="/images/my_icon_github.png"
            width={16}
            height={16}
            alt="GitHubアイコン"
          />
          <Link
            href="https://github.com/KadoProG/everyone-v3"
            target="_blank"
          >
            KadoProG/everyone-v3
          </Link>
        </div>
        <div className={styles.main__title__git}>
          <Image
            src="/images/my_icon_youtube.png"
            width={16}
            height={16}
            alt="YouTubeアイコン"
          />
          <Link href="https://youtu.be/Lw88J6RVvgk" target="_blank">
            紹介動画（3分）
          </Link>
        </div>
      </div>

      <section>
        <p>
          進化した「みんなの記事v3」いわゆるWebクローラーは、学内メンバーの課題を簡単に見ることができます。お気に入り登録、デバッグ等の確認がこれ一つで実行できます。
        </p>
      </section>

      <div className={styles.main__btnList}>
        <div>
          <div>
            <h2>単体表示</h2>
            <div className={styles.singleWindowContainer}>
              <SingleWindow animation={true} />
            </div>
            <p>
              一つひとつ記事を確認、デバッグするために使用するものです。レスポンシブ表示などに対応します。
            </p>
          </div>
          <Link href="/single">閲覧する！</Link>
        </div>
        <div>
          <div>
            <h2>マルチ表示</h2>
            <div className={styles.multiWindow}>
              <SingleWindow className={styles.multiWindow__1} />
              <SingleWindow className={styles.multiWindow__2} />
              <SingleWindow className={styles.multiWindow__3} />
              <SingleWindow className={styles.multiWindow__4} />
            </div>
            <p>一度にたくさんのコンテンツを閲覧できます。</p>
          </div>
          <Link href="/multi">閲覧する！</Link>
        </div>
      </div>

      <MarkdownView
        markdownStringBody={fileContent}
        className={styles.contents}
      />
    </main>
  );
};
