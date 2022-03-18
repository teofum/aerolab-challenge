import toast, { Toast } from 'react-hot-toast';

import utilStyles from '../../styles/Utils.module.scss';

interface ToastProps {
  children: React.ReactNode;
  toastRef: Toast
}

const ToastTemplate = ({ children, toastRef }: ToastProps) => {
  return (
    <div className={utilStyles.toastContent}>
      <div>
        {children}
      </div>
      <button className={utilStyles.toastClose} onClick={() => toast.dismiss(toastRef.id)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.75 5.25L5.25 18.75" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
          <path d="M18.75 18.75L5.25 5.25" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default ToastTemplate;