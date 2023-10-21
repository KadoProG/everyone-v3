import "../../public/css/window.scss";
const Home = () => {
  return (
    <>
      <main className="main">
        <h1>みんなの記事v3</h1>
        <p>
          進化した「みんなの記事v3」は、学内メンバーの課題を簡単に見ることができます。お気に入り登録、デバッグ等の確認がこれ一つで実行できます。
        </p>

        <div className="main__btnList">
          <div>
            <h2>単体表示</h2>
            <div className="singleWindow">
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div></div>
            </div>
            <p>一つひとつ記事を確認、デバッグするために使用するものです。</p>
          </div>
          <div>
            <h2>マルチ表示</h2>
            <p>一度にたくさんのコンテンツを閲覧できます、</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
