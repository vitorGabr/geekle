import { ResultWord } from "@/types/ResultWord";
import { Stack, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { BadgeStatus } from './BadgeStatus';
import { WordItem } from "./WordItem";

type Props = {
  currentRow: number;
  expectedWordLenght: number;
  words: ResultWord[];
  word: string;
  currentItem: number;
  setCurrentItem: (item: number) => void;
  badgeStatus?: string;
};

export const Words = ({
  currentRow,
  expectedWordLenght,
  words,
  word,
  currentItem,
  setCurrentItem,
  badgeStatus,
}: Props) => {
  return (
    <Stack
      spacing={1}
      w={'100%'}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {badgeStatus && <BadgeStatus value={badgeStatus} />}

      {[...Array(6)].map((_, index) => {
        const isTyping = currentRow === index;
        return (
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            w={{
              base: '100%',
              md: 'auto',
            }}
            gap={1}
            key={index}
          >
            {[...Array(expectedWordLenght)].map((i, idx) => {
              return (
                <WordItem
                  key={idx}
                  value={isTyping ? word[idx] : words[index]?.value[idx]}
                  result={words[index] ? words[index].result[idx] : undefined}
                  isFocused={currentItem === idx && index === currentRow}
                  onClick={() => index === currentRow && setCurrentItem(idx)}
                />
              );
            })}
          </Flex>
        );
      })}
    </Stack>
  );
};