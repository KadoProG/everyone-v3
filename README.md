# みんなの記事v3
![v3](https://github.com/KadoProG/everyone-v3/assets/65702927/a900ec45-8c0b-42be-8f48-bdbd30f81bc7)

「みんなの記事v3」いわゆるWebクローラーは、学内メンバーの課題を簡単に見ることができます。

<p style="color:red">※原則、学内の人のみの閲覧になります。パスワードを要求されたらご容赦ください。</p>

学外向け：YouTubeは[こちら](https://youtu.be/Lw88J6RVvgk)

## 旧型の「みんなの記事」

<img width="676" alt="v1" src="https://github.com/KadoProG/everyone-v3/assets/65702927/e1179607-a24f-4dd5-a57e-6723d8ba85cb">

初代、みんなの記事は、2022年5月15日に制作しました。

学校で、「Webコンテンツ及び演習」という講義があり、そこで学生が一人ひとり、HTML,CSS,JavaScript等を用いてWebサイトを作る、という課題が出されました。

作った課題は全員が見られるのですが、その名前、あるいは学生番号を一つひとつクリックして、いちいち確認するのがあまりにも屈辱的すぎて、これをもっと簡単にできるシステムを作ろう、ということで作りました。

[「みんなの記事v1」を閲覧する](https://fast5-blog.com/html-product/uni-web/blogs/everyone.html)

### URLを書き換えて、iframeに表示するだけ

今回の「みんなの記事」別名Webクローラーは、いずれもiframeにURLを書き換えているだけです。しかし、同じWebクローラー形式のサイトを、同級生が私より早く作ってしまい、かつ機能も豊富だったことから、再度作り直したのが次に紹介するv2です。

## 機能を圧倒的に増やしたv2

<img width="449" alt="v2" src="https://github.com/KadoProG/everyone-v3/assets/65702927/b0b3c287-8c7d-4399-b372-57994d6df9a9">

次に紹介するのはv2です。2022年6月11日に完成したらしいです。v2では、以下の機能を追加しました。

- レスポンシブ表示（タブレット、スマホ）
- お気に入り機能の追加、textデータの発行・取り込み
- 再読み込み（リロード）ボタン等の追加

[「みんなの記事v2」を閲覧する](https://fast5-blog.com/html-product/uni-web/blogs/newEveryone.html)

お気に入り機能は、ローカルストレージという機能を用いています。v1,v2いずれも**HTML, CSS, JavaScript**で、かつライブラリやフレームワーク等も使用していなかったと思います。

## 更に進化した「みんなの記事v3」

前回作成したのが2022年6月ということで、作成してからだいぶ時間が経ちました。

その際「Webコンテンツ」にしか対応していなかったことから、カスタマイズ性に疑問がありました。また、当時のコードは非常に見づらいコードとなっており、これはイカン！ということで再度作り直しました。

関数の動きや処理の流れをもう一度見直し、メンテナンス性の高いコードにしました。また、**Next.js**を使用し、React Hooksを使用した変数宣言、レスポンスのいい動作を実現しました。

### 操作性の大幅変更

|ダイアログ方式の操作パネル|スマホUIでのレスポンシブ確認|
|--|--|
|<img width="390" alt="v3_1" src="https://github.com/KadoProG/everyone-v3/assets/65702927/35bcb7cb-b6b6-466a-a6ee-d1de4aaaf466">|https://github.com/KadoProG/everyone-v3/assets/65702927/37a8d001-e3a0-440b-9775-c10eb881f9af|

UIも大幅に変更し、従来のブログ型から、１ページ完結型に変更し、上いっぱいにiframeが表示されるように変更しました。

操作ボタンをダイアログ方式にし、アクセシビリティや多機能ボタンを使いやすくしました。

また、スマホでの操作を考慮し、ボタンを下部に表示したり、レスポンシブ表示の`transform: scale()`を併用して、スマホでもPC・タブレット表示を可能としました。

前回と同様お気に入り機能を備えていることや、ロード時の「最初に表示」機能も追加しました。素早く自分の課題を確認することができます。

### お気に入りテキストファイルの「ドラッグアンドドロップ」に対応

|お気に入りデータの|ドラッグアンドドロップ|
|--|--|
|![v3_2](https://github.com/KadoProG/everyone-v3/assets/65702927/d447f206-9c1f-4bde-b2b6-61cba3f05edb)|![v3_3](https://github.com/KadoProG/everyone-v3/assets/65702927/e3b44d01-999b-48da-93df-ad121ba1307d)|

また、従来ではできなかった、**お気に入りデータのドラッグアンドドロップ**にも対応しました。というのも、iframeの上ではドラッグアンドドロップができないらしく、みんなの記事v2では大きな課題でした。

さらに、インポート時のオプションも追加し、圧倒的な使いやすさを実現しました。

## 閲覧の超越「マルチ表示」に対応しました

これに加えて「マルチ表示」機能にも対応させました。これは、今まで単体表示のみだったものを、複数表示に対応させ、一度に大量のコンテンツを見られるようにしたものです。こちらも同様にお気に入り登録が可能です。
