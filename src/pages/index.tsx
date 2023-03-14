import { KeyBoard } from '@/components/Keyboard';
import { Navbar } from '@/components/Navbar';
import { Words } from '@/components/Words';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routes/_app';
import { WordResultType } from '@/types/enums/WordResultType';
import { HistoryStorage } from '@/types/HistoryStorage';
import { ResultWord } from '@/types/ResultWord';
import { trpc } from '@/utils/trpc';
import { Box, Container, Flex } from '@chakra-ui/react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from 'next/head';
import { useState, useEffect, useMemo, useRef } from 'react';

export default function Home() {
  const { data } = trpc.wordDay.useQuery();
  const expectedWord = data?.word || 'word';
  const expectedWordLenght = expectedWord.length;
  const completedGame = useRef(true);

  const [history, setHistory] = useLocalStorage<HistoryStorage>('history', {
    [`${data?.id || 0}`]: {
      history: [],
      completed: false,
    },
  });
  const [word, setWord] = useState<string>(''.padEnd(expectedWordLenght));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [words, setWords] = useState<ResultWord[]>([]);
  const [badgeStatus, setBadgeStatus] = useState<string | undefined>(undefined);

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (completedGame.current) return;
    const newWord = word.split('');
    if (e.key === 'Enter') {
      if (newWord.filter((k) => k != ' ').length < expectedWordLenght) return;

      const correctsWord = newWord.filter((w, i) => w === expectedWord[i]);
      let expectedsWords = newWord
        .map((w, i) =>
          expectedWord.includes(w) && w !== expectedWord[i]
            ? {
                index: i,
                value: w,
              }
            : null
        )
        .filter((item) => !!item)
        .filter((item, index, self) => {
          const _rp = self
            .filter((el) => el?.value == item?.value)
            .indexOf(item);
          return (
            _rp <
            expectedWord.split('').filter((el) => item?.value === el).length -
              correctsWord.filter((el) => item?.value === el).length
          );
        });
      const result = newWord.map((w, i) => {
        if (w === expectedWord[i]) {
          return WordResultType.CORRECT;
        }
        if (expectedsWords.some((w) => w?.index == i)) {
          return WordResultType.ALMOST;
        }
        return WordResultType.INCORRECT;
      });
      const wordResult = {
        value: word,
        result,
      };
      let storage = {
        ...history,
        [`${data?.id || 0}`]: {
          ...history[`${data?.id || 0}`],
          history: [
            ...(history[`${data?.id || 0}`]?.history || []),
            wordResult,
          ],
        },
      };
      setCurrentRow(currentRow + 1);
      setWords([...words, wordResult]);
      setCurrentItem(0);
      setWord(new Array(expectedWordLenght).fill(' ').join(''));
      if (word === expectedWord) {
        setBadgeStatus('Parabéns! Você acertou a palavra!');
        completedGame.current = true;
        storage[`${data?.id || 0}`].completed = true;
      }
      if (word !== expectedWord && currentRow === 5) {
        setBadgeStatus('A palavra certa é: ' + expectedWord + '');
      }
      setHistory(storage);
      return;
    }
    if (e.key === 'Backspace') {
      newWord[currentItem] = ' ';
      setCurrentItem((currentItem) =>
        currentItem - 1 < 0 ? 0 : currentItem - 1
      );
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      newWord[currentItem] = e.key;
      setCurrentItem((currentItem) =>
        currentItem + 1 > expectedWordLenght - 1
          ? expectedWordLenght - 1
          : currentItem + 1
      );
    }
    setWord(newWord.join(''));
  };

  const typedWord = useMemo(() => {
    if (!words[currentRow - 1]) return [];
    const flatWords = words
      .map((word, index) => {
        return word.value.split('').map((w, i) => {
          return {
            value: w,
            result: words[index].result[i],
          };
        });
      })
      .flat()
      .sort((a, b) => b.result - a.result);

    const nonDuplicateWords = new Set();
    return flatWords.filter((word) => {
      if (nonDuplicateWords.has(word.value)) {
        return false;
      }
      nonDuplicateWords.add(word.value);
      return true;
    });
  }, [words]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItem, word, completedGame]);

  useEffect(() => {
    if (Object.keys(history).length > 0) {
      const historyStorage = history[`${data?.id || 0}`];
      if (historyStorage) {
        completedGame.current = historyStorage.completed;
        setWords(historyStorage.history);
        setCurrentRow(historyStorage.history.length);
        return;
      }
    }
  }, [history]);

  return (
    <Box
      w={'100vw'}
      minH={'100vh'}
      flexFlow={'column'}
      display={'flex'}
      bg={'black'}
    >
      <Head>
        <title>Quizle - Um jogo de adivinhação de palavras</title>
        <meta
          name="description"
          content="Quizle - Um jogo de adivinhação de palavras"
        />
      </Head>
      <Navbar />
      <Container
        maxW={'container.xl'}
        flex={1}
        as={Flex}
        flexDirection={'column'}
      >
        <Words
          badgeStatus={badgeStatus}
          setCurrentItem={setCurrentItem}
          expectedWordLenght={expectedWordLenght}
          word={word}
          currentRow={currentRow}
          currentItem={currentItem}
          words={words}
        />
        <KeyBoard
          onPress={(key) => handleKeyDown({ key } as KeyboardEvent)}
          wordResult={typedWord}
        />
      </Container>
      {/* {
        <CompletedGameModal
          isOpen={completedGame.isOpen}
          onClose={completedGame.onClose}
        />
      } */}
    </Box>
  );
}

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
  });

  try {
    await ssg.wordDay.fetch();
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
