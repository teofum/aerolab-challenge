import styles from '../../styles/PointsIcon.module.css';

const PointsIcon = () => {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm5.84,10.72-4.43,4.9-1.86,
      2.06a2.82,2.82,0,0,1-2.26,1.07,3.09,3.09,0,0,1-2.52-1.49,3.19,3.19,0,0,
      0-2.83-1.53h0a.5.5,0,0,1-.51-.5.51.51,0,0,1,.51-.51h0a4.19,4.19,0,0,1,
      3.64,1.91c.57.71.94,1.11,1.71,1.11A1.78,1.78,0,0,0,10.78,17l.21-.22a.19.19,
      0,0,0,0-.13L9.32,8.48a.28.28,0,0,1,.15-.32l5.06-2.87A.32.32,0,0,1,15,5.4l2.92,
      5A.3.3,0,0,1,17.84,10.72Z"/>
    </svg>
  );
}

export default PointsIcon;