import { useEffect, useState } from "react";
import cn from "classnames";

import ProductCard from "./ProductCard";
import Paginator from "./Paginator";

import styles from '../../styles/Products.module.scss';
import typeStyles from '../../styles/Type.module.scss';

import Product from "../../types/Product";
import ButtonSelect from "./ButtonSelect";

import User from "../../types/User";

interface ProductsProps {
  products: Product[],
  user: User | null,
  redeem: (product: Product) => void
}

const sortFunctions: { [key: string]: (a: Product, b: Product) => number } = {
  recent: (a, b) => 0, /* There's no date in the API model, assume already sorted */
  low: (a, b) => a.cost - b.cost,
  high: (a, b) => b.cost - a.cost
}

const Products = ({ products, user, redeem }: ProductsProps) => {
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    const vw = window?.innerWidth;
    if (vw && vw >= 1600) setPageSize(16);
    else if (vw && vw < 900) setPageSize(8);
  }, []);

  const categories = new Set<string>(products
    .map(product => product.category));

  const sortOptions = [
    { name: 'Most Recent', value: 'recent' },
    { name: 'Lowest Price', value: 'low' },
    { name: 'Highest Price', value: 'high' }
  ];

  const filtered = products
    .filter(product => !filter || product.category === filter);


  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <main className={styles.main}>
      <h2 className={typeStyles.titleL2}>
        <em>Tech</em> products
      </h2>

      <div className={styles.filters}>
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

        <hr className={styles.divider} />

        <div className={styles.sort}>
          <label htmlFor='sort-radio'>Sort by:</label>
          <ButtonSelect options={sortOptions} selected={sort} set={setSort}
            id='sort-radio' />
        </div>

        <div className={styles.paginatorTop}>
          <Paginator page={page} total={pageCount} set={setPage} />
        </div>
      </div>

      <div className={styles.grid}>
        {filtered
          .sort(sortFunctions[sort])
          .slice(page * pageSize, (page + 1) * pageSize)
          .map(product => (
            <ProductCard key={product._id}
              product={product} user={user} redeem={redeem} />
          ))}
      </div>

      <div className={styles.pagination}>
        <div className={cn(styles.pageSize, typeStyles.light, typeStyles.em)}>
          <em>{Math.min(pageSize, filtered.length)} of {filtered.length}</em> products
        </div>
        <Paginator page={page} total={pageCount} set={setPage} />
      </div>
    </main>
  );
}

export default Products;