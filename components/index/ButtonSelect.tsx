import cn from "classnames";

import styles from '../../styles/ButtonSelect.module.scss';
import typeStyles from '../../styles/Type.module.scss';

interface ButtonSelectProps {
  options: { name: string, value: string }[];
  selected: string;
  set: (opt: string) => void;
  id: string;
  small?: boolean;
}

const ButtonSelect = ({ options, selected, set, id, small }: ButtonSelectProps) => {
  return (
    <div id={id} className={cn(styles.main, { [styles.small]: small })}>
      {options.map((opt, i) => (
        <button key={i} name={`${id}-${i}`}
          className={cn(
            styles.option,
            {
              [styles.selected]: opt.value === selected,
              [styles.small]: small,
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