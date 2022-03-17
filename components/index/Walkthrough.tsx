import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import ButtonSelect from './ButtonSelect';
import PointsIcon from './PointsIcon';
import LoadingAnim from './LoadingAnim';

import User from '../../types/User';

import styles from '../../styles/Walkthrough.module.css';
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
      {[0, 1, 2].map(i => (
        <div key={i} className={styles.card} style={{ '--n': i - 1 } as any}>
          <div className={styles.cardTop}>
            <Image src={`/illustrations/wt-${i + 1}-desktop.png`}
              width={508} height={498} />
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.cardIcon}>
              <Image src={`/icons/wt-${i + 1}.svg`}
                width={40} height={40} />
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