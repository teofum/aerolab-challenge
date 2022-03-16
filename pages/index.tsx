import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Products from '../components/index/Products';

import styles from '../styles/Home.module.css';
import typeStyles from '../styles/Type.module.css';

import Product from '../types/Product';
import User from '../types/User';

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ products }: HomeProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    refreshUser();
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

  const redeemProduct = async (product: Product) => {
    /* Pre-deduct cost of product, so you can't try to redeem more than you can
     * afford by clicking very fast */
    if (user) setUser({
      ...user,
      points: user.points - product.cost
    });

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

    refreshUser();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header className={styles.header}>
        <Image src='/icons/aerolab-logo-1.svg' width={126} height={48} />

        <div>{user?.points}</div>
      </header>

      <Products products={products} available={user?.points || 0} redeem={redeemProduct} />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
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
