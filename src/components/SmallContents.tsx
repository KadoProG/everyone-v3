export const SmallContents = () => {
  return (
    <div className="smallContents">
      <ul>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>
      <div className="smallContents__flex">
        <span></span>
        <p>ようこそゲストさん！</p>
      </div>
      <div className="smallContents__2">
        <p>
          <b>最新の情報</b>
        </p>
        <ul>
          <li>
            <span>2023/10/21</span>
            <span>新規の記事を上げました</span>
          </li>
          <li>
            <span>2023/10/18</span>
            <span>スイカゲームをJavaScriptのCanvasで作ってみました</span>
          </li>
        </ul>
      </div>
      <div className="smallContents__footer">
        <div>
          <div>
            <p>
              <b>私のサイト</b>
            </p>
            <ul>
              <li>Notion</li>
              <li>X</li>
              <li>YouTube</li>
              <li>Qiita</li>
              <li>Zenn</li>
            </ul>
          </div>
          <div>
            <p>
              <b>趣味</b>
            </p>
            <ul>
              <li>ガジェット</li>
              <li>React･Nextjs</li>
              <li>PHP･SQL</li>
              <li>HTML･CSS</li>
              <li>Other</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
