import cn from "classnames";

import styles from '../../styles/Paginator.module.scss';
import typeStyles from '../../styles/Type.module.scss';

interface PaginatorProps {
  page: number;
  total: number;
  set: (p: number) => void
}

const Paginator = ({ page, total, set }: PaginatorProps) => {
  return (
    <div className={styles.main}>
      <button aria-label='Page back' className={styles.page} disabled={page === 0}
        onClick={() => set(Math.max(0, page - 1))}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 4.5L7.5 12L15 19.5" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel" />
        </svg>
      </button>

      <span className={cn(typeStyles.light, typeStyles.em)}>
        Page <em>{page + 1} of {total}</em>
      </span>

      <button aria-label='Page forward' className={styles.page} disabled={page === total - 1}
        onClick={() => set(Math.min(total - 1, page + 1))}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 4.5L16.5 12L9 19.5" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel" />
        </svg>
      </button>
    </div>
  );
}

export default Paginator;