import cn from 'classnames';

import styles from '../../styles/Hero.module.css';
import typeStyles from '../../styles/Type.module.css';

const Hero = () => {
  return (
    <header className={styles.main}>
      <div className={styles.title}>
        <span className={cn(typeStyles.allCaps, typeStyles.light)}>Explore the</span>
        <h1 className={typeStyles.titleL1}><em>Tech</em> Zone</h1>
        <p className={typeStyles.light}>
          Here you’ll be able to exchange all of your hard-earned<br/>Aeropoints and exchange them for cool tech.
        </p>
      </div>

      <div className={styles.illustration}>
        <div className={styles.illustrationBg} />
        <img src='/illustrations/hero-desktop.png' width={900} height={900} />
      </div>
    </header>
  );
};

export default Hero;