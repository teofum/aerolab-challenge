import cn from "classnames";

import styles from '../../styles/ButtonRadio.module.css';
import typeStyles from '../../styles/Type.module.css';

interface ButtonSelectProps {
  options: { name: string, value: string }[];
  selected: string;
  set: (opt: string) => void;
  id: string;
}

const ButtonSelect = ({ options, selected, set, id }: ButtonSelectProps) => {
  return (
    <div id={id} className={styles.main}>
      {options.map((opt, i) => (
        <button key={i}
          className={cn(
            styles.option,
            {
              [styles.selected]: opt.value === selected,
              [typeStyles.em]: opt.value !== selected
            }
          )}
          onClick={() => set(opt.value)}>
            {opt.value === selected ? opt.name : (<em>{opt.name}</em>)}
          </button>
      ))}
    </div>
  );
}

export default ButtonSelect;