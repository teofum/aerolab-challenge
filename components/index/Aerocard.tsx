import PointsIcon from './PointsIcon';

import User from '../../types/User';

import styles from '../../styles/Aerocard.module.css';
import typeStyles from '../../styles/Type.module.css';

const Aerocard = ({ user }: { user: User | null}) => {
  return (
    <div className={styles.main}>
      <div className={styles.waves} />

      <div>
        <span>Aerocard</span>
        <PointsIcon />
      </div>

      <div className={typeStyles.textL2}>
        <span>{user?.name}</span>
        <span>07/23</span>
      </div>
    </div>
  );
};

export default Aerocard;