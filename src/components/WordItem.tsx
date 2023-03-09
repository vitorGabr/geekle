import { WordResult } from "@/types/WordResult";

type Props = {
    onClick: () => void,
    value?: string,
    isFocused?: boolean
    result?: WordResult;
}

export const WordItem = ({ onClick, value, isFocused, result }: Props) => {

    const border = isFocused ? 'border-white' : 'border-gray-600';
    const bg = result === 'correct' ? 'bg-green-500' : result === 'almost' ? 'bg-yellow-500' : result === 'wrong' ? 'bg-neutral-900' : 'bg-black/10';

    return <div
        onClick={onClick}
        className={`
            h-12
            w-12
            2xl:h-16
            2xl:w-16
            border-2
            overflow-visible
            cursor-pointer
            ${border} 
            rounded-lg 
            flex 
            items-center 
            justify-center 
            text-3xl 
            font-extrabold
            text-white 
            transition-all
            duration-300
            xl:text-2xl
            ${bg}
        `}
    >
        {value?.toUpperCase()}
    </div>
}