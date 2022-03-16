import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import Aeropay from './Aeropay';

import User from '../../types/User';

import styles from '../../styles/PointsCounter.module.css';
import typeStyles from '../../styles/Type.module.css';
import utilStyles from '../../styles/Utils.module.css';

interface PointsCounterProps {
  user: User | null;
  addPoints: (amt: number) => void;
  loading: boolean;
}

const PointsCounter = ({ user, addPoints, loading }: PointsCounterProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      styles.main,
      utilStyles.elevation1,
      utilStyles.hv,
      { [utilStyles.active]: expanded }
    )}>
      <span className={cn(styles.counter, typeStyles.em)}>
        <Image src='/icons/aeropay-1.svg' width={32} height={32} />
        <em>{user?.points.toLocaleString('en-US') || 0}</em>
      </span>

      <button className={cn(styles.expand, { [styles.expanded]: expanded })}
        onClick={() => setExpanded(!expanded)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 9L12 16.5L19.5 9" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="bevel" />
        </svg>
      </button>

      {expanded &&
        <div className={styles.aeropay}>
          <Aeropay user={user} addPoints={addPoints}
            loading={loading} close={() => setExpanded(false)} />
        </div>}
    </div>
  );
};

export default PointsCounter;