import { BadgeStatus } from "@/components/BadgeStatus";
import { CompletedGameModal } from "@/components/CompletedGameModal";
import { KeyBoard } from "@/components/Keyboard";
import { Navbar } from "@/components/Navbar";
import { Words } from "@/components/Words";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/routes/_app";
import { WordResultType } from "@/types/enums/WordResultType";
import { HistoryStorage } from "@/types/HistoryStorage";
import { ResultWord } from "@/types/ResultWord";
import { trpc } from "@/utils/trpc";
import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";

export default function Home() {

    const { data } = trpc.wordDay.useQuery();
    const expectedWord = data?.word || 'word';
    const completedGame = useDisclosure();
    const expectedWordLenght = expectedWord.length;

    const [history, setHistory] = useLocalStorage<HistoryStorage>('history', {
        [`${data?.id || 0}`]: {
            history: [],
            completed: false,
        }
    });
    const [word, setWord] = useState<string>(new Array(expectedWordLenght).fill(' ').join(''));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentItem, setCurrentItem] = useState(0);
    const [words, setWords] = useState<ResultWord[]>([]);
    const [showCompletedGame, setShowCompletedGame] = useState(false);
    const [badgeStatus, setBadgeStatus] = useState({
        isOpen: true,
        value: '',
    });

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (showCompletedGame) return;
        const newWord = word.split('');
        if (newWord.filter((k) => k != ' ').length < expectedWordLenght) return;

        if (e.key === 'Enter') {
            const expectedWordAlmost = word
                .split('')
                .filter((w, i) => expectedWord.includes(w) && w !== expectedWord[i])
                .map((item) => word.indexOf(item));

            const result = word.split('').map((w, i) => {
                if (w === expectedWord[i]) {
                    return WordResultType.CORRECT;
                }
                if (expectedWordAlmost.length > 0 && expectedWordAlmost.includes(i)) {
                    return WordResultType.ALMOST;
                }
                return WordResultType.INCORRECT;
            });
            const wordResult = {
                value: word,
                result,
            }
            let storage = {
                ...history,
                [`${data?.id || 0}`]: {
                    ...history[`${data?.id || 0}`],
                    history: [...history[`${data?.id || 0}`]?.history || [], wordResult],
                }
            }

            setCurrentRow(currentRow + 1);
            setWords([...words, wordResult]);
            setCurrentItem(0);
            setWord(new Array(expectedWordLenght).fill(' ').join(''));
            if (word === expectedWord) {
                setBadgeStatus({
                    isOpen: true,
                    value: 'Parabéns! Você acertou a palavra!',
                });
                setShowCompletedGame(true);
                storage[`${data?.id || 0}`].completed = true;
            } else {
                setBadgeStatus({
                    isOpen: true,
                    value: 'A palavra certa é: ' + expectedWord + '',
                });
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
        const flatWords = words.map((word, index) => {
            return word.value.split('').map((w, i) => {
                return {
                    value: w,
                    result: words[index].result[i]
                }
            })
        }).flat().sort((a, b) => b.result - a.result);

        const nonDuplicateWords = new Set();
        return flatWords.filter((word) => {
            if (nonDuplicateWords.has(word.value)) {
                return false;
            }
            nonDuplicateWords.add(word.value);
            return true;
        });
    }, [words])

    useEffect(() => {
        if (Object.keys(history).length > 0) {
            const historyStorage = history[`${data?.id || 0}`];
            if (historyStorage) {
                setShowCompletedGame(historyStorage.completed);
                setWords(historyStorage.history);
                setCurrentRow(historyStorage.history.length);
            }
        }
    }, [history]);

    return <Box
        w={"100vw"}
        minH={"100vh"}
        flexFlow={"column"}
        display={"flex"}
        bg={"black"}
    >
        <Head>
            <title>Quizle - Um jogo de adivinhação de palavras</title>
            <meta name="description" content="Quizle - Um jogo de adivinhação de palavras" />
        </Head>
        <Navbar />
        <Container
            maxW={"container.xl"}
            flex={1}
            as={Flex}
            flexDirection={"column"}
        >
            {
                badgeStatus.isOpen && <BadgeStatus value={badgeStatus.value} />
            }
            <Words
                onChangeKey={handleKeyDown}
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
        {
            <CompletedGameModal
                isOpen={completedGame.isOpen}
                onClose={completedGame.onClose}
            />
        }
    </Box>
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
        };
    } catch (error) {
        return {
            notFound: true,
        }
    }


}