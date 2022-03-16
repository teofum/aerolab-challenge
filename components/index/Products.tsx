import ProductCard from "./ProductCard";

import styles from '../../styles/Products.module.css';
import typeStyles from '../../styles/Type.module.css';

import Product from "../../types/Product";

interface ProductsProps {
  products: Product[],
  available: number
}

const Products = ({ products, available }: ProductsProps) => {
  return (
    <main className={styles.main}>
      <h1 className={typeStyles.titleL2}>
        <em>Tech</em> products
      </h1>

      {available /* test, remove later */}

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product._id}
            product={product} available={available} />
        ))}
      </div>
    </main>
  );
}

export default Products;