# みんなの記事v3

2023/10/21 作成開始
2023/10/22 これから作成します（デザイン起こし）

進化した「みんなの記事v3」いわゆるWebクローラーは、学内メンバーの課題を簡単に見ることができます。お気に入り登録、デバッグ等の確認がこれ一つで実行できます。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 単体表示

一つひとつ記事を確認、デバッグするために使用するものです。レスポンシブ表示などに対応します。

## マルチ表示

一度にたくさんのコンテンツを閲覧できます。

## 旧型の「みんなの記事」

初代、みんなの記事は、2022年5月15日に制作しました。

学校で、「Webコンテンツ及び演習」という講義があり、そこで学生が一人ひとり、HTML,CSS,JavaScript等を用いてWebサイトを作る、という課題が出されました。

作った課題は全員が見られるのですが、その名前、あるいは学生番号を一つひとつクリックして、いちいち確認するのがあまりにも屈辱的すぎて、これをもっと簡単にできるシステムを作ろう、ということで作りました。

### URLを書き換えて、iframeに表示するだけ

今回の「みんなの記事」別名Webクローラーは、いずれもiframeにURLを書き換えているだけです。しかし、同じWebクローラー形式のサイトを、同級生が私より早く作ってしまい、かつ機能も豊富だったことから、再度作り直したのが次に紹介するv2です。

## 機能を圧倒的に増やしたv2

次に紹介するのはv2です。2022年6月11日に完成したらしいです。v2では、以下の機能を追加しました。

- レスポンシブ表示（タブレット、スマホ）
- お気に入り機能の追加、textデータの発行・取り込み
- 再読み込み（リロード）ボタン等の追加

お気に入り機能は、ローカルストレージという機能を用いています。v1,v2いずれもHTML,CSS,JavaScriptで、かつライブラリやフレームワーク等も使用していなかったと思います。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
