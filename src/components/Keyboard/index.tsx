import { WordResult } from '@/types/WordResult';
import { KeyBoardItem } from '../KeyboardItem';

const keys: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Backspace'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
];

type Props = {
  onPress: (key: string) => void;
  wordResult?: {
    value: string;
    result: WordResult;
  }[];
};

export const KeyBoard = ({ onPress, wordResult }: Props) => {
  return (
    <div
      className={
        'mx-auto mb-2 flex w-11/12 flex-col items-center justify-center gap-1 md:w-1/2 2xl:w-1/2'
      }
    >
      {keys.map((row, i) => {
        return (
          <div
            key={i}
            className="flex w-full items-center justify-center gap-1"
          >
            {row.map((key, j) => {
              const result = wordResult?.find((r) => r.value === key);
              return (
                <KeyBoardItem
                  key={j}
                  result={result?.result}
                  onClick={() => onPress(key)}
                  value={key}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
