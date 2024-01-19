'use client';

import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/components/domains/home/HomeHeader.module.scss';

export const HomeHeader = () => {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <p>ここがﾍｯﾀﾞ</p>
      <div className={styles.account}>
        {status === 'loading' ? (
          'お待ちを'
        ) : (
          <>
            <div className={styles.top}>
              <span>{session?.user?.name ?? 'ゲスト'}</span>
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={30}
                  height={30}
                  alt={'GitHubのアイコン'}
                />
              )}
            </div>
            <button
              onClick={() => (session?.user?.name ? signOut() : signIn())}
              className={styles.button}
            >
              {session?.user?.name ? 'ログアウト' : 'ログイン'}
            </button>
          </>
        )}
      </div>
    </header>
  );
};
