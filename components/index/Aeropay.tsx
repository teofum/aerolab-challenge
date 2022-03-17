import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import ButtonSelect from './ButtonSelect';
import PointsIcon from './PointsIcon';
import LoadingAnim from './LoadingAnim';

import User from '../../types/User';

import styles from '../../styles/Aeropay.module.css';
import typeStyles from '../../styles/Type.module.scss';
import utilStyles from '../../styles/Utils.module.css';
import Aerocard from './Aerocard';

interface AeropayProps {
  user: User | null;
  addPoints: (points: number) => void;
  loading: boolean;
  close: () => void;
}

const Aeropay = ({ user, addPoints, loading, close }: AeropayProps) => {
  const [points, setPoints] = useState('1000');

  const pointsOptions = [
    { name: '1000', value: '1000' },
    { name: '5000', value: '5000' },
    { name: '7500', value: '7500' }
  ];

  return (
    <div className={cn(styles.main, utilStyles.elevation1, utilStyles.active)}>
      <div className={styles.header}>
        Add Balance
        <button className={styles.close} onClick={close}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.75 5.25L5.25 18.75" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M18.75 18.75L5.25 5.25" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.aerocard}>
          <Aerocard user={user} />
        </div>

        <ButtonSelect id={'points-select'}
          options={pointsOptions} selected={points} set={setPoints} small />

        {!user && <div className={utilStyles.ctaSkeleton} />}
        {user &&
          <button className={cn(utilStyles.cta, utilStyles.elevation1, utilStyles.hv)}
            disabled={loading} onClick={() => addPoints(parseInt(points))}>
            {!loading && <PointsIcon />}
            {!loading && <span>Add Points</span>}
            {loading && <LoadingAnim />}
          </button>}
      </div>
    </div>
  );
};

export default Aeropay;