import { WordResultType } from '@/types/enums/WordResultType';
import { Flex, Stack } from '@chakra-ui/react';
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
    result: WordResultType;
  }[];
};

export const KeyBoard = ({ onPress, wordResult }: Props) => {
  return (
    <Stack
      pb={4}
      spacing={2}
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      {keys.map((row, i) => {
        return (
          <Flex
            key={i}
            gap={2}
            w={{
              base: '100%',
              md: 'auto',
            }}
            alignItems="stretch"
          >
            {row.map((key, j) => {
              const data = wordResult?.find((r) => r.value === key);
              return (
                <KeyBoardItem
                  key={j}
                  result={data?.result}
                  onClick={() => onPress(key)}
                  value={key}
                />
              );
            })}
          </Flex>
        );
      })}
    </Stack>
  );
};
