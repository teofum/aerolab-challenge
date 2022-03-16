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
  const [filter, setFilter] = useState('');

  const categories = new Set<string>(products
    .map(product => product.category));

  const filtered = products
    .filter(product => !filter || product.category === filter);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <main className={styles.main}>
      <h1 className={typeStyles.titleL2}>
        <em>Tech</em> products
      </h1>

      <div className={styles.filters}>
        <div className={styles.filterSort}>
          <div className={styles.filter}>
            <label htmlFor='filter-select'>Filter by:</label>
            <div className={styles.select}>
              <select id='filter-select' value={filter} onChange={e => {
                setFilter((e.nativeEvent.target as HTMLSelectElement).value);
                setPage(0);
              }}>
                <option value=''>All Products</option>
                {[...categories].map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Paginator page={page} total={pageCount} set={setPage} />
      </div>

      <div className={styles.grid}>
        {filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
          .map(product => (
            <ProductCard key={product._id}
              product={product} available={available} />
          ))}
      </div>

      <div className={styles.pagination}>
        <div className={cn(styles.pageSize, typeStyles.light, typeStyles.em)}>
          <em>{Math.min(PAGE_SIZE, filtered.length)} of {filtered.length}</em> products
        </div>
        <Paginator page={page} total={pageCount} set={setPage} />
      </div>
    </main>
  );
}

export default Products;