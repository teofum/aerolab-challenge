import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../styles/Home.module.css';
import typeStyles from '../styles/Type.module.css';

import Product from '../types/Product';
import ProductCard from '../components/index/ProductCard';

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ products }: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={typeStyles.titleL2}>
          <em>Tech</em> products
        </h1>

        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>

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
  const res = await fetch('https://coding-challenge-api.aerolab.co/products', {
    method: 'GET',
    headers: {
      Authorization: auth
    }
  });
  const products: Product[] = await res.json();

  return {
    props: {
      products
    }
  };
}

export default Home
