import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Profile } from '@/components/Profile';

import styles from './styles.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Homepage">
            <Logo />
          </Link>
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.profile}>
          <Profile />
        </div>
      </div>
    </div>
  );
};
