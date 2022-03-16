import { useState } from "react";
import cn from "classnames";

import ProductCard from "./ProductCard";
import Paginator from "./Paginator";

import styles from '../../styles/Products.module.css';
import typeStyles from '../../styles/Type.module.css';

import Product from "../../types/Product";

interface ProductsProps {
  products: Product[],
  available: number
}

const PAGE_SIZE = 16;

const Products = ({ products, available }: ProductsProps) => {
  const [page, setPage] = useState(0);

  const categories = new Set<string>(products
    .map(product => product.category));

  const pageCount = Math.ceil(products.length / PAGE_SIZE);

  return (
    <main className={styles.main}>
      <h1 className={typeStyles.titleL2}>
        <em>Tech</em> products
      </h1>

      <div className={styles.filters}>
        <div />
        <Paginator page={page} total={pageCount} set={setPage} />
      </div>

      <div className={styles.grid}>
        {products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
          .map(product => (
            <ProductCard key={product._id}
              product={product} available={available} />
          ))}
      </div>

      <div className={styles.pagination}>
        <div className={cn(styles.pageSize, typeStyles.light, typeStyles.em)}>
          <em>{PAGE_SIZE} of {products.length}</em> products
        </div>
        <Paginator page={page} total={pageCount} set={setPage} />
      </div>
    </main>
  );
}

export default Products;