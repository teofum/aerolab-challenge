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
  let card: HTMLElement | null = null;

  const [redeeming, setRedeeming] = useState(false);
  useEffect(() => {
    setRedeeming(false);
  }, [user]);

  /* Fancy 3D mouse-follow effect. Probably wouldn't do something this
   * over the top in a real app, I'm just showing off a bit. */
  useEffect(() => {
    if (!card) return;

    const c = card;
    const mouseHandler = (ev: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      const absX = ev.clientX - rect.left;
      const absY = ev.clientY - rect.top;

      const x = absX / rect.width * 2 - 1;
      const y = absY / rect.height * 2 - 1;

      c.style.setProperty('--x', `${y * -4}deg`);
      c.style.setProperty('--y', `${x * 4}deg`);
    };

    c.addEventListener('mousemove', mouseHandler);

    return () => {
      c?.removeEventListener('mousemove', mouseHandler);
    };
  }, [])

  return (
    <div className={styles.container}>
      <div className={cn(styles.card, utilStyles.elevation1)}
        ref={el => card = el}>
        <div className={styles.productImage}>

          <Image src='/icons/placeholder.svg' width={96} height={96} alt={product.name} />

          {/* We can ignore the "standard" definition image, since its size
            is smaller than the display size (252 vs 280px) it will -always-
            look blurry. We're better off letting Next optimize for us instead */}
          <Image src={product.img.hdUrl} width={280} height={204} alt={product.name} />
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
          <img src='/icons/aeropay-1.svg' alt='Points' />
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