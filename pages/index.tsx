import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Products from '../components/index/Products';

import styles from '../styles/Home.module.css';
import typeStyles from '../styles/Type.module.css';

import Product from '../types/Product';
import User from '../types/User';

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ products, user }: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Products products={products} available={user.points} />

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
  )
}

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMwZjNjZjE4NjFhMTAwMjExZmQyMGYiLCJpYXQiOjE2NDczNzUzMTF9.Cwl0RXO993rJYnpghxxhdbOUnHOh0J_sx42YyljpSq0';

export const getServerSideProps = async () => {
  const resProducts = await fetch('https://coding-challenge-api.aerolab.co/products', {
    method: 'GET',
    headers: {
      Authorization: auth
    }
  });
  const products: Product[] = await resProducts.json();

  const resUser = await fetch('https://coding-challenge-api.aerolab.co/user/me', {
    method: 'GET',
    headers: {
      Authorization: auth
    }
  });
  const user: User = await resUser.json();

  return {
    props: {
      products,
      user
    }
  };
}

export default Home
