'use client';

import { WordResult } from "@/types/WordResult";
import { useEffect, useState } from "react";
import { KeyBoard } from "./KeyBoard";
import { WordItem } from "./WordItem";

type Props = {
  expectedWord: string;
}


export const WordsBox = ({
  expectedWord,
}: Props) => {

  const [currentRow, setCurrentRow] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [resultWords, setResultWords] = useState<WordResult[][]>([]);
  const [showCompletedGame, setShowCompletedGame] = useState(false);

  const [word, setWord] = useState<string>('');
  const expectedWordLenght = expectedWord.length;

  const handleKeyDown = async (e: KeyboardEvent) => {
    if(showCompletedGame) return;
    let newWord = word.split('');

    if (e.key === 'Enter') {
      if (word.length < expectedWordLenght) {
        return;
      }
      // const valid = await verifyIfWordIsValid(word);
      // if (!valid) {
      //   alert('Word is not valid');
      //   return;
      // }
      const expectedWordAlmost = word.split('')
      .filter((w, i) => expectedWord.includes(w) && w !== expectedWord[i])
      .map((item) => word.indexOf(item))

      const result = word.split('').map((w, i) => {
        if (w === expectedWord[i]) {
          return 'correct';
        }
        if (expectedWordAlmost.length > 0 && expectedWordAlmost.includes(i)) {
          return 'almost';
        }
        return 'wrong';
      })

      setShowCompletedGame(true);
      setCurrentRow(currentRow + 1);
      setResultWords([...resultWords, result]);
      setWords([...words, word]);
      setCurrentItem(0);
      setWord('');
      return;
    }
    if (e.key === 'Backspace') {
      newWord[currentItem] = '';
      setCurrentItem((currentItem) => currentItem - 1 < 0 ? 0 : currentItem - 1);
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      newWord[currentItem] = e.key;
      setCurrentItem(currentItem => currentItem + 1 > (expectedWordLenght - 1) ? (expectedWordLenght - 1) : currentItem + 1);
    }

    setWord(newWord.join(''));
  }

  const typedWord = () => {
    let result = Array.from(words?.map((word, i) => {
      return word.split('').map((w, j) => {
        const result = resultWords[i][j];
        return {
          value: w,
          result,
        };
      })
    }).flat())

    return result.filter((r) => {
      const find = result.find((f) => f.value === r.value && f.result === 'correct');
      if (r.result !== 'correct' && !!find) {
        return false;
      }
      return true;
    });
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentItem, word]);


  return <div
    className="flex flex-col items-center justify-center gap-1"
  >
    <div
      className="mt-10 mb-2 gap-1 flex flex-col"
    >
      {[...Array(expectedWordLenght + 1)].map((_, index) => {
        return <div
          key={index}
          className="flex items-center justify-center gap-1">
          {[...Array(expectedWordLenght)].map((i, idx) => {
            const key = currentRow === index ? word[idx] : words[index]?.[idx];
            const result = resultWords[index] ? resultWords[index][idx] : undefined;
            return (
              <WordItem
                key={idx}
                value={key}
                result={result}
                isFocused={currentItem === idx && index === currentRow}
                onClick={() => {
                  setCurrentItem(idx)
                }}
              />
            )
          })}
        </div>
      })}
    </div>
    <KeyBoard
      onPress={(key) => {
        handleKeyDown({ key } as KeyboardEvent);
      }}
      wordTyped={words[currentRow - 1]}
      wordResult={typedWord()}
    />
    {/* {
      <CompletedGameModel />
    } */}
  </div>
}