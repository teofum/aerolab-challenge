import Image from 'next/image';
import cn from 'classnames';

import styles from '../../styles/ProductCard.module.css';
import typeStyles from '../../styles/Type.module.css';

import Product from '../../types/Product';
import PointsIcon from './PointsIcon';

interface ProductCardProps {
  product: Product,
  available: number
}

const ProductCard = ({ product, available }: ProductCardProps) => {
  const canAfford = product.cost <= available;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.productImage}>
          {/* We can ignore the "standard" definition image, since its size
            is smaller than the display size (252 vs 280px) it will -always-
            look blurry. We're better off letting Next optimize for us instead */}
          <Image src={product.img.hdUrl} width={280} height={204} />
        </div>

        <div className={styles.productInfo}>
          <div>{product.name}</div>
          <div className={cn(
            typeStyles.textL2,
            typeStyles.allCaps,
            typeStyles.light
          )}>{product.category}</div>
        </div>
      </div>

      <button className={styles.cta} disabled={!canAfford}>
        <span>{canAfford ? 'Redeem for' : 'You need'}</span>
        <PointsIcon />
        <span>{product.cost}</span>
      </button>
    </div>
  )
}

export default ProductCard;