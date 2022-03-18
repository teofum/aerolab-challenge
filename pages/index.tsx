import { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import cn from 'classnames';
import toast, { Toaster } from 'react-hot-toast';

import Hero from '../components/index/Hero';
import PointsCounter from '../components/index/PointsCounter';
import Products from '../components/index/Products';
import ToastTemplate from '../components/index/ToastTemplate';
import Walkthrough from '../components/index/Walkthrough';

import styles from '../styles/Home.module.scss';
import typeStyles from '../styles/Type.module.scss';
import utilStyles from '../styles/Utils.module.scss';

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
    const res = await fetch('https://coding-challenge-api.aerolab.co/user/me', {
      method: 'GET',
      headers: {
        Authorization: auth
      }
    });

    if (!res.ok) {
      toast.error(t => (
        <ToastTemplate toastRef={t}>
          <span className={typeStyles.light}>There was a problem fetching user data</span>
        </ToastTemplate>
      ), {
        className: cn(utilStyles.toast, utilStyles.error),
        duration: 10000
      });
    }

    const user: User = await res.json();

    if (user) setUser(user);
  };

  const addPoints = async (amt: number) => {
    setLoadingPoints(true);

    const res = await fetch('https://coding-challenge-api.aerolab.co/user/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        amount: amt
      })
    });

    if (!res.ok) {
      toast.error(t => (
        <ToastTemplate toastRef={t}>
          <span className={typeStyles.light}>There was a problem with the transaction</span>
        </ToastTemplate>
      ), {
        className: cn(utilStyles.toast, utilStyles.error),
        duration: 10000
      });
    } else {
      toast.success(t => (
        <ToastTemplate toastRef={t}>
          {amt} points <span className={typeStyles.light}>added&nbsp;succesfully</span>
        </ToastTemplate>
      ), {
        className: cn(utilStyles.toast, utilStyles.success),
        duration: 10000
      });
    }

    setLoadingPoints(false);
    refreshUser();
  };

  const redeemProduct = async (product: Product) => {
    const res = await fetch('https://coding-challenge-api.aerolab.co/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        productId: product._id
      })
    });

    if (!res.ok) {
      toast.error(t => (
        <ToastTemplate toastRef={t}>
          <span className={typeStyles.light}>There was a problem with the transaction</span>
        </ToastTemplate>
      ), {
        className: cn(utilStyles.toast, utilStyles.error),
        duration: 10000
      });
    } else {
      toast.success(t => (
        <ToastTemplate toastRef={t}>
          {product.name} <span className={typeStyles.light}>redeemed&nbsp;succesfully</span>
        </ToastTemplate>
      ), {
        className: cn(utilStyles.toast, utilStyles.success),
        duration: 10000
      });
    }

    refreshUser();
  };

  return (
    <div className={styles.container}>
      <Toaster position='bottom-left' toastOptions={{
        success: {
          iconTheme: {
            primary: 'var(--green)',
            secondary: 'white'
          }
        },
        error: {
          iconTheme: {
            primary: 'var(--red)',
            secondary: 'white'
          }
        }
      }} />

      <div className={cn(
        styles.stickyHeader,
        utilStyles.elevation3,
        { [styles.hidden]: !sticky }
      )}>
        <header className={styles.header}>
          <img className={styles.logoMobile} alt='Logo'
            src='/icons/aerolab-logo-2.svg' width={48} height={48} />
          <img className={styles.logoDesktop} alt='Logo'
            src='/icons/aerolab-logo-1.svg' width={126} height={48} />
          <PointsCounter user={user} addPoints={addPoints} loading={loadingPoints} />
        </header>
      </div>

      <header className={styles.header}>
        <img className={styles.logoMobile} alt='Logo'
          src='/icons/aerolab-logo-2.svg' width={48} height={48} />
        <img className={styles.logoDesktop} alt='Logo'
          src='/icons/aerolab-logo-1.svg' width={126} height={48} />
        <PointsCounter user={user} addPoints={addPoints} loading={loadingPoints} />
      </header>

      <div className={styles.waves} />

      <Hero />
      <Walkthrough />

      <Products products={products} user={user} redeem={redeemProduct} />

      <footer className={cn(styles.footer, typeStyles.light)}>
        <a href="https://github.com/teofum/aerolab-challenge"
          target="_blank"
          rel="noopener noreferrer"
        >
          View this repository on&nbsp;
          <img className={styles.logo} src='/icons/github-default.svg' alt='GitHub' />
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
