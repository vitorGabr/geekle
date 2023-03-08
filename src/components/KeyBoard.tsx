import { WordResult } from "@/types/WordResult";
import { KeyBoardItem } from "./KeyBoardItem";

const keys: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Backspace'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
];

type Props = {
    onPress: (key: string) => void,
    wordTyped?: string,
    wordResult?: {
        value: string,
        result: WordResult,
    }[],
}

export const KeyBoard = ({
    onPress,
    wordTyped,
    wordResult,
}: Props) => {
    return <div
        className="flex flex-col gap-2"
    >
        {
            keys.map((row, i) => {
                return <div
                    key={i}
                    className="flex justify-center gap-2">
                    {
                        row.map((key, j) => {
                            const result = wordResult?.find((r) => r.value === key);
                            return <KeyBoardItem
                                key={j}
                                result={result?.result}
                                onClick={() => onPress(key)}
                                value={key}

                            />

                        })
                    }
                </div>
            })
        }
    </div>
}