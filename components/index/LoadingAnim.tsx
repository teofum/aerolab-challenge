import styles from '../../styles/LoadingAnim.module.css';

const LoadingAnim = () => {
  return (
    <div className={styles.main}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={styles.dot}
          style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
};

export default LoadingAnim;