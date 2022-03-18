import { useEffect, useState } from 'react';

import Image from 'next/image';
import cn from 'classnames';

import styles from '../../styles/Walkthrough.module.scss';
import typeStyles from '../../styles/Type.module.scss';
import utilStyles from '../../styles/Utils.module.scss';

const Walkthrough = () => {
  const [showCards, setShowCards] = useState(false);
  let card: HTMLElement | null = null;

  useEffect(() => {
    if (showCards) return;
    const el = card;

    const handler = () => {
      const rect = el?.getBoundingClientRect();
      const threshold = window.innerHeight - (rect?.height || 0) / 2;
      if ((rect?.top || 0) < threshold) {
        setShowCards(true);
        window.removeEventListener('scroll', handler);
      }
    };

    window.addEventListener('scroll', handler);
    handler(); // Call once to show cards if they're already in viewport

    return () => window.removeEventListener('scroll', handler);
  }, []);

  const cardTitles = [
    '1—Browse',
    '2—Choose',
    '3—Enjoy!'
  ];

  const cardTexts = [
    'Browse our tech catalog with more than 20 top tech products',
    'Exchange your hard earned AeroPoints for the item you want',
    'All done, you can relax! We’ll take care of delivery of your tech item!'
  ];

  return (
    <div className={styles.main}>
      {/* Manually optimized some images, Next's Image component adds elements
        * that make them harder to work with */}
      <img className={styles.illustration} alt='Hero'
        src='/illustrations/hero-responsive.webp'
        srcSet='/illustrations/hero-responsive.webp 1x, /illustrations/hero-desktop.webp 2x' />

      {[0, 1, 2].map(i => (
        <div key={i}
          className={cn(
            styles.card,
            utilStyles.elevation2,
            { [styles.visible]: showCards }
          )}
          style={{ '--n': i - 1 } as any}
          ref={el => { if (i === 1) card = el; }}>
          <div className={styles.cardTop}>
            <Image src={`/illustrations/wt-${i + 1}-desktop.png`}
              alt={cardTitles[i]} width={508} height={498} />
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.cardIcon}>
              <img src={`/icons/wt-${i + 1}.svg`} alt='Icon' />
            </div>
            <span className={typeStyles.titleL3}><em>{cardTitles[i]}</em></span>

            <p className={typeStyles.light}>
              {cardTexts[i]}
            </p>
          </div>
        </div>))}
    </div>
  );
};

export default Walkthrough;