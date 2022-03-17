import Image from 'next/image';
import cn from 'classnames';

import styles from '../../styles/Walkthrough.module.scss';
import typeStyles from '../../styles/Type.module.scss';
import utilStyles from '../../styles/Utils.module.css';

const Walkthrough = () => {
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
      <img className={styles.illustration}
        src='/illustrations/hero-responsive.png'
        srcSet='/illustrations/hero-responsive.png 1x, /illustrations/hero-desktop.png 2x' />

      {[0, 1, 2].map(i => (
        <div key={i} className={cn(styles.card, utilStyles.elevation2)}
          style={{ '--n': i - 1 } as any}>
          <div className={styles.cardTop}>
            <Image src={`/illustrations/wt-${i + 1}-desktop.png`}
              width={508} height={498} />
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.cardIcon}>
              <img src={`/icons/wt-${i + 1}.svg`} />
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