import '../public/css/globals.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { ENVIROMENT_KEY } from '../features/environmentKey';
import NextAuthProvider from './providers/NextAuth';

const inter = Inter({ subsets: ['latin'] });

const baseURL = ENVIROMENT_KEY.BASE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(baseURL || 'http://localhost:3000'),
  title: 'みんなの記事v3 - 学内の記事が簡単に見られます',
  description:
    '進化した「みんなの記事v3」は、学内メンバーの課題を簡単に見ることができます。',
  keywords: '日本大学工学部 Webサイト,HTML CSS JavaScript',
  openGraph: {
    type: 'website',
    images: [{ url: baseURL + '/images/v3.png' }],
    title: 'みんなの記事v3 - 学内の記事が簡単に見られます',
    description:
      '進化した「みんなの記事v3」は、学内メンバーの課題を簡単に見ることができます。',
    siteName: 'みんなの記事v3',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KadoUniversity',
    title: 'みんなの記事v3 - 学内の記事が簡単に見られます',
    images: [baseURL + '/images/v3.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics gaId={ENVIROMENT_KEY.GA_TRACKING_ID} />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
