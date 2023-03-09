import { WordResult } from '@/types/WordResult';
import { Delete } from 'lucide-react';
import { ComponentProps } from 'react';
import styles from './keyboardItem.module.css';

type Props = {
  onClick: () => void;
  result?: WordResult;
  value?: string;
};

export const KeyBoardItem = ({ onClick, value, result }: Props) => {
  if (value === 'Backspace') {
    return (
      <div onClick={onClick} className={styles.key}>
        <Delete />
      </div>
    );
  }

  if (value === 'Enter') {
    return (
      <div onClick={onClick} className={styles.keyContainer}>
        Enter
      </div>
    );
  }

  let bg =
    result === 'correct'
      ? 'bg-green-600'
      : result === 'wrong'
      ? 'bg-neutral-800'
      : '';

  return (
    <div onClick={onClick} className={`${styles.key} ${bg}`}>
      {value?.toLocaleUpperCase()}
    </div>
  );
};

const Container = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="col-span-1 cursor-pointer rounded-lg border-2 border-neutral-600 text-sm font-bold text-white transition-all duration-300 hover:bg-neutral-700 md:text-xl">
      {children}
    </div>
  );
};
