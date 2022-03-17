import cn from 'classnames';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Hero from '../components/index/Hero';
import PointsCounter from '../components/index/PointsCounter';
import Products from '../components/index/Products';
import Walkthrough from '../components/index/Walkthrough';

import styles from '../styles/Home.module.scss';
import typeStyles from '../styles/Type.module.scss';
import utilStyles from '../styles/Utils.module.css';

import Product from '../types/Product';
import User from '../types/User';

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ products }: HomeProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [sticky, setSticky] = useState(false);
  const [loadingPoints, setLoadingPoints] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    const handler = () => {
      const main = document.querySelector('main');
      setSticky((main?.getBoundingClientRect().top || 0) < 100);
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* User data needs to be fetched client-side, since points amount can change */
  const refreshUser = async () => {
    const resUser = await fetch('https://coding-challenge-api.aerolab.co/user/me', {
      method: 'GET',
      headers: {
        Authorization: auth
      }
    });
    const user: User = await resUser.json();

    if (user) setUser(user);
  };

  const addPoints = async (amt: number) => {
    setLoadingPoints(true);

    await fetch('https://coding-challenge-api.aerolab.co/user/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        amount: amt
      })
    });

    setLoadingPoints(false);
    refreshUser();
  };

  const redeemProduct = async (product: Product) => {
    await fetch('https://coding-challenge-api.aerolab.co/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        productId: product._id
      })
    });

    refreshUser();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={cn(
        styles.stickyHeader,
        utilStyles.elevation3,
        { [styles.hidden]: !sticky }
      )}>
        <header className={styles.header}>
          <img className={styles.logoMobile}
            src='/icons/aerolab-logo-2.svg' width={48} height={48} />
          <img className={styles.logoDesktop}
            src='/icons/aerolab-logo-1.svg' width={126} height={48} />
          <PointsCounter user={user} addPoints={addPoints} loading={loadingPoints} />
        </header>
      </div>

      <header className={styles.header}>
        <img className={styles.logoMobile}
          src='/icons/aerolab-logo-2.svg' width={48} height={48} />
        <img className={styles.logoDesktop}
          src='/icons/aerolab-logo-1.svg' width={126} height={48} />
        <PointsCounter user={user} addPoints={addPoints} loading={loadingPoints} />
      </header>

      <Hero />
      <Walkthrough />

      <Products products={products} available={user?.points} redeem={redeemProduct} />

      <footer className={cn(styles.footer, typeStyles.light)}>
        <a href="https://github.com/teofum/aerolab-challenge"
          target="_blank"
          rel="noopener noreferrer"
        >
          View this repository on&nbsp;
          <img className={styles.logo} src='/icons/github-default.svg' />
        </a>
      </footer>
    </div>
  );
}

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMwZjNjZjE4NjFhMTAwMjExZmQyMGYiLCJpYXQiOjE2NDczNzUzMTF9.Cwl0RXO993rJYnpghxxhdbOUnHOh0J_sx42YyljpSq0';

/* We can do SSR for the products list, since it doesn't change often.
 * A live app might use SSG with some form of CI that auto-updates when
 * the products list changes, for even better performance. */
export const getServerSideProps = async () => {
  const resProducts = await fetch('https://coding-challenge-api.aerolab.co/products', {
    method: 'GET',
    headers: {
      Authorization: auth
    }
  });
  const products: Product[] = await resProducts.json();

  return {
    props: {
      products
    }
  };
}

export default Home
