import cn from "classnames";

import styles from '../../styles/Paginator.module.css';
import typeStyles from '../../styles/Type.module.css';

interface PaginatorProps {
  page: number;
  total: number;
  set: (p: number) => void
}

const Paginator = ({ page, total, set }: PaginatorProps) => {
  return (
    <div className={styles.main}>
      <button className={styles.page} disabled={page === 0}
        onClick={() => set(page - 1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 4.5L7.5 12L15 19.5" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="bevel" />
        </svg>
      </button>

      <span className={cn(typeStyles.light, typeStyles.em)}>
        Page <em>{page + 1} of {total}</em>
      </span>

      <button className={styles.page} disabled={page === total - 1}
        onClick={() => set(page + 1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 4.5L16.5 12L9 19.5" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="bevel" />
        </svg>
      </button>
    </div>
  );
}

export default Paginator;