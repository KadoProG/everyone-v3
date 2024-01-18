'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/app/home.scss';
import '@/app/window.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SingleWindow } from '@/components/SingleWindow';

const Home = () => {
  const { data: session, status } = useSession();
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
      <header className="header">
        <p>ここがﾍｯﾀﾞ</p>
        <div className="account">
          {/* {JSON.stringify(session)} */}

          {status === 'loading' ? (
            'お待ちを'
          ) : (
            <>
              <div className="top">
                <span>{session?.user?.name ?? 'ゲスト'}</span>
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={30}
                    height={30}
                    alt={'GitHubのアイコン'}
                  />
                ) : (
                  ''
                )}
              </div>
              <button
                onClick={() => (session?.user?.name ? signOut() : signIn())}
                className="button"
              >
                {session?.user?.name ? 'ログアウト' : 'ログイン'}
              </button>
            </>
          )}
        </div>
      </header>
      <main className="main">
        <div className="main__title">
          <h1>みんなの記事v3</h1>
          <p className="main__title__date">2023/10/21</p>
          <div className="main__title__git">
            <Image
              src="/images/my_icon_github.png"
              width={16}
              height={16}
              alt="GitHubアイコン"
            />
            <Link
              href={'https://github.com/KadoProG/everyone-v3'}
              target="_blank"
            >
              KadoProG/everyone-v3
            </Link>
          </div>
          <div className="main__title__git">
            <Image
              src="/images/my_icon_youtube.png"
              width={16}
              height={16}
              alt="YouTubeアイコン"
            />
            <Link href={'https://youtu.be/Lw88J6RVvgk'} target="_blank">
              紹介動画（3分）
            </Link>
          </div>
        </div>
        <section>
          <p>
            進化した「みんなの記事v3」いわゆるWebクローラーは、学内メンバーの課題を簡単に見ることができます。お気に入り登録、デバッグ等の確認がこれ一つで実行できます。
          </p>
        </section>

        <div className="main__btnList">
          <div>
            <div>
              <h2>単体表示</h2>
              <div className="singleWindowContainer">
                <SingleWindow animation={true} />
              </div>
              <p>
                一つひとつ記事を確認、デバッグするために使用するものです。レスポンシブ表示などに対応します。
              </p>
            </div>
            <Link href={'/single'}>閲覧する！</Link>
          </div>
          <div>
            <div>
              <h2>マルチ表示</h2>
              <div className="multiWindow">
                <SingleWindow className="multiWindow__1" />
                <SingleWindow className="multiWindow__2" />
                <SingleWindow className="multiWindow__3" />
                <SingleWindow className="multiWindow__4" />
              </div>
              <p>一度にたくさんのコンテンツを閲覧できます。</p>
            </div>
            <Link href={'/multi'}>閲覧する！</Link>
          </div>
        </div>
        <section>
          <p className="main__error">
            ※原則、学内の人のみの閲覧になります。パスワードを要求されたらご容赦ください。
          </p>
        </section>
        <h2>旧型の「みんなの記事」</h2>
        <section>
          <div className="main__image">
            <Image
              src={'/images/v1.png'}
              width={300}
              height={200}
              alt={'みんなの記事v1'}
            />
          </div>
          <p>初代、みんなの記事は、2022年5月15日に制作しました。</p>
          <p>
            学校で、「Webコンテンツ及び演習」という講義があり、そこで学生が一人ひとり、HTML,CSS,JavaScript等を用いてWebサイトを作る、という課題が出されました。
          </p>
          <p>
            作った課題は全員が見られるのですが、その名前、あるいは学生番号を一つひとつクリックして、いちいち確認するのがあまりにも屈辱的すぎて、これをもっと簡単にできるシステムを作ろう、ということで作りました。
          </p>
          <a
            href="https://fast5-blog.com/html-product/uni-web/blogs/everyone.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            「みんなの記事v1」を閲覧する
          </a>
        </section>
        <h3>URLを書き換えて、iframeに表示するだけ</h3>
        <section>
          <p>
            今回の「みんなの記事」別名Webクローラーは、いずれもiframeにURLを書き換えているだけです。しかし、同じWebクローラー形式のサイトを、同級生が私より早く作ってしまい、かつ機能も豊富だったことから、再度作り直したのが次に紹介するv2です。
          </p>
        </section>
        <h2>機能を圧倒的に増やしたv2</h2>
        <section>
          <div className="main__image">
            <Image
              src="/images/v2.png"
              width={300}
              height={200}
              alt="みんなの記事v2"
            />
          </div>
          <p>
            次に紹介するのはv2です。2022年6月11日に完成したらしいです。v2では、以下の機能を追加しました。
          </p>
          <ul>
            <li>レスポンシブ表示（タブレット、スマホ）</li>
            <li>お気に入り機能の追加、textデータの発行・取り込み</li>
            <li>再読み込み（リロード）ボタン等の追加</li>
          </ul>
          <a
            href="https://fast5-blog.com/html-product/uni-web/blogs/newEveryone.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            「みんなの記事v2」を閲覧する
          </a>
          <p>
            お気に入り機能は、ローカルストレージという機能を用いています。v1,v2いずれも
            <b>HTML, CSS, JavaScript</b>
            で、かつライブラリやフレームワーク等も使用していなかったと思います。
          </p>
        </section>
        <h2>更に進化した「みんなの記事v3」</h2>
        <section>
          <div className="main__image">
            <Image
              src="/images/v3.png"
              width={300}
              height={180}
              alt="みんなの記事v3"
            />
          </div>
          <p>
            前回作成したのが2022年6月ということで、作成してからだいぶ時間が経ちました。
          </p>
          <p>
            その際「Webコンテンツ」にしか対応していなかったことから、カスタマイズ性に疑問がありました。また、当時のコードは非常に見づらいコードとなっており、これはイカン！ということで再度作り直しました。
          </p>
          <p>
            関数の動きや処理の流れをもう一度見直し、メンテナンス性の高いコードにしました。また、
            <b>Next.js</b>を使用し、React
            Hooksを使用した変数宣言、レスポンスのいい動作を実現しました。
          </p>
        </section>
        <h3>操作性の大幅変更</h3>
        <section>
          <p>
            UIも大幅に変更し、従来のブログ型から、１ページ完結型に変更し、上いっぱいにiframeが表示されるように変更しました。
          </p>
          <div className="main__image">
            <Image
              src="/images/v3_1.png"
              width={300}
              height={180}
              alt="みんなの記事v3"
            />
            <video
              src="/images/v3_0.mp4"
              width={300}
              height={600}
              controls
            ></video>
          </div>
          <p>
            操作ボタンをダイアログ方式にし、アクセシビリティや多機能ボタンを使いやすくしました。
          </p>

          <p>
            また、スマホでの操作を考慮し、ボタンを下部に表示したり、レスポンシブ表示の
            <code>transform: scale()</code>
            を併用して、スマホでもPC・タブレット表示を可能としました。
          </p>
          <p>
            前回と同様お気に入り機能を備えていることや、ロード時の「最初に表示」機能も追加しました。素早く自分の課題を確認することができます。
          </p>
        </section>
        <h3>お気に入りテキストファイルの「ドラッグアンドドロップ」に対応</h3>
        <section>
          <div className="main__image">
            <Image
              src="/images/v3_2.png"
              width={300}
              height={180}
              alt="みんなの記事v3"
            />
            <Image
              src="/images/v3_3.png"
              width={300}
              height={180}
              alt="みんなの記事v3"
            />
          </div>
          <p>
            また、従来ではできなかった、
            <b>お気に入りデータのドラッグアンドドロップ</b>
            にも対応しました。というのも、iframeの上ではドラッグアンドドロップができないらしく、みんなの記事v2では大きな課題でした。
          </p>
          <p>
            さらに、インポート時のオプションも追加し、圧倒的な使いやすさを実現しました。
          </p>
        </section>

        <h2>閲覧の超越「マルチ表示」に対応しました</h2>
        <section>
          <p>
            これに加えて「マルチ表示」機能にも対応させました。これは、今まで単体表示のみだったものを、複数表示に対応させ、一度に大量のコンテンツを見られるようにしたものです。こちらも同様にお気に入り登録が可能です。
          </p>
        </section>
      </main>
      <footer className="footer">
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
        <p className="copyright">&copy; KadoBloG 2023</p>
      </footer>
    </>
  );
};

export default Home;
