import cn from 'classnames';

import styles from '../../styles/Hero.module.scss';
import typeStyles from '../../styles/Type.module.scss';
import utilStyles from '../../styles/Utils.module.scss';

const Hero = () => {
  const scrollDown = () => {
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={styles.main}>
      <div className={styles.title}>
        <span className={cn(typeStyles.allCaps, typeStyles.light)}>Explore the</span>
        <h1 className={typeStyles.titleL1}><em>Tech</em> Zone</h1>
        <p className={typeStyles.light}>
          Here you’ll be able to redeem all of your hard-earned Aeropoints and exchange them for cool tech.
        </p>

        <button className={cn(
          utilStyles.cta,
          styles.bigCta,
          utilStyles.elevation1,
          utilStyles.hv)}
          onClick={scrollDown}>
          <span>View all products</span>

          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.75 17.6L16.5 23.85H14.75L8.5 17.6L10.25 15.825L14.375 19.925V6H16.875V19.925L21 15.8L22.75 17.6Z" />
          </svg>
        </button>
      </div>

      <div className={styles.illustration}>
        <div className={styles.illustrationBg} />
        {/* Manually optimized some images, Next's Image component adds elements
          * that make them harder to work with */}
        <img src='/illustrations/hero-desktop.webp' alt='Hero' width={900} height={900} />
      </div>
    </header>
  );
};

export default Hero;