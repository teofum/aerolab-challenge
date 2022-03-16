import { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import PointsIcon from './PointsIcon';
import LoadingAnim from './LoadingAnim';

import styles from '../../styles/ProductCard.module.css';
import typeStyles from '../../styles/Type.module.css';
import utilStyles from '../../styles/Utils.module.css';

import Product from '../../types/Product';

interface ProductCardProps {
  product: Product,
  available?: number,
  redeem: (product: Product) => void
}

const ProductCard = ({ product, available, redeem }: ProductCardProps) => {
  const canAfford = product.cost <= (available || 0);
  const loading = available === undefined;

  const [redeeming, setRedeeming] = useState(false);
  useEffect(() => {
    setRedeeming(false);
  }, [available]);

  return (
    <div className={styles.container}>
      <div className={cn(styles.card, utilStyles.elevation1)}>
        <div className={styles.productImage}>

          <Image src='/icons/placeholder.svg' width={96} height={96} />

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

      {loading && <div className={utilStyles.ctaSkeleton} />}
      {!loading &&
        <button className={cn(utilStyles.cta, utilStyles.elevation1, utilStyles.hv)}
          disabled={!canAfford || redeeming} onClick={() => {
            redeem(product);
            setRedeeming(true);
          }}>
          {!redeeming && <span>{canAfford ? 'Redeem for' : 'You need'}</span>}
          {!redeeming && <PointsIcon />}
          {!redeeming && <span>{product.cost.toLocaleString('en-US')}</span>}
          {redeeming && <LoadingAnim />}
        </button>}
    </div>
  )
}

export default ProductCard;