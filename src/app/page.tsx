import Link from "next/link";
import SingleWindow from "../../components/single_window";
import "../../public/css/window.scss";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <main className="main">
        <div className="main__title">
          <h1>みんなの記事v3</h1>
          <p className="main__title__date">2023/10/21</p>
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
            <Link href={"/single"}>閲覧する！</Link>
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
            <Link href={"/"}>閲覧する！</Link>
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
              src={"/images/v1.png"}
              width={300}
              height={200}
              alt={"みんなの記事v1"}
            />
          </div>
          <p>初代、みんなの記事は、2022年5月15日に制作しました。</p>
          <p>
            学校で、「Webコンテンツ及び演習」という講義があり、そこで学生が一人ひとり、HTML,CSS,JavaScript等を用いてWebサイトを作る、という課題が出されました。
          </p>
          <p>
            作った課題は全員が見られるのですが、その名前、あるいは学生番号を一つひとつクリックして、いちいち確認するのがあまりにも屈辱的すぎて、これをもっと簡単にできるシステムを作ろう、ということで作りました。
          </p>
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
          <p>
            お気に入り機能は、ローカルストレージという機能を用いています。v1,v2いずれもHTML,
            CSS,
            JavaScriptで、かつライブラリやフレームワーク等も使用していなかったと思います。
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
