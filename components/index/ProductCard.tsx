import { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import PointsIcon from './PointsIcon';
import LoadingAnim from './LoadingAnim';

import styles from '../../styles/ProductCard.module.scss';
import typeStyles from '../../styles/Type.module.scss';
import utilStyles from '../../styles/Utils.module.scss';

import Product from '../../types/Product';
import User from '../../types/User';

interface ProductCardProps {
  product: Product,
  user: User | null,
  redeem: (product: Product) => void
}

const ProductCard = ({ product, user, redeem }: ProductCardProps) => {
  const canAfford = product.cost <= (user?.points || 0);
  const loading = user?.points === undefined;

  const [redeeming, setRedeeming] = useState(false);
  useEffect(() => {
    setRedeeming(false);
  }, [user]);

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

        <span className={cn(styles.costLabel, typeStyles.em)}>
          <img src='/icons/aeropay-1.svg' />
          <em>{product.cost.toLocaleString('en-US')}</em>
        </span>
      </div>

      {loading && <div className={utilStyles.ctaSkeleton} />}
      {!loading &&
        <button className={cn(
          utilStyles.cta,
          utilStyles.elevation1,
          utilStyles.hv,
          { [utilStyles.ctaLoading]: redeeming })}
          disabled={!canAfford || redeeming} onClick={() => {
            redeem(product);
            setRedeeming(true);
          }}>
          {!redeeming && <span>{canAfford ? 'Redeem for' : 'You need'}</span>}
          {!redeeming && <PointsIcon />}
          {!redeeming && <span>{
            (canAfford ? product.cost : product.cost - user.points)
              .toLocaleString('en-US')
          }</span>}
          {redeeming && <LoadingAnim />}
        </button>}
    </div>
  )
}

export default ProductCard;