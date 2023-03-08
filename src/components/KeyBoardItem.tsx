import { WordResult } from '@/types/WordResult';
import { Delete } from 'lucide-react';
import { ComponentProps, useEffect, useRef } from 'react';

type Props = {
    onClick: () => void,
    result?: WordResult,
    value?: string,
}

export const KeyBoardItem = ({ onClick, value,result }: Props) => {



    let button: ComponentProps<'div'> = {
        className: `h-14 
            border-2 
            border-neutral-600
            rounded-lg 
            flex 
            items-center 
            justify-center 
            text-2xl 
            font-extrabold
            text-white 
            transition-all
            duration-300
            cursor-pointer
            hover:bg-neutral-700
            ${!result ? 'bg-neutral-800' : result === 'correct' ? 'bg-green-600' : result === 'wrong' ? 'bg-neutral-900' : 'bg-yellow-500'}
        `,
    }

    if (value === 'Backspace') {
        button.className += ' ml-4';
        button.children = <Delete />
    }else if (value === 'Enter') {
        button.className += ' bg-green-600 px-4';
        button.children = 'Enter';
    } else {
        button.children = value?.toUpperCase();
    }

    return <div
        onClick={onClick}
        style={{
            minWidth: '3.5rem',
        }}
        {...button}
    />
}