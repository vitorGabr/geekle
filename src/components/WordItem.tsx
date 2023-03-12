import { WordResultType } from "@/types/enums/WordResultType";
import { Center } from "@chakra-ui/react";
import { ComponentProps, useMemo } from "react";

type Props = {
    onClick: () => void,
    value?: string,
    isFocused?: boolean
    result?: WordResultType;
}

export const WordItem = ({ onClick, value, isFocused, result }: Props) => {

    const border: ComponentProps<typeof Center>['bgColor'] = isFocused ? 'blue.500' : 'gray.700';
    const bg: ComponentProps<typeof Center>['bgColor'] = useMemo(() => {
        switch (result) {
            case WordResultType.CORRECT:
                return 'green.500';
            case WordResultType.INCORRECT:
                return 'red.500';
            case WordResultType.ALMOST:
                return 'yellow.500';
            default:
                return 'gray.800';
        }
    }, [result]);

    return <Center
        onClick={onClick}
        w={{
            base: '4rem',
            md: '3.2rem',
        }}
        h={{
            base: '4rem',
            md: '3.2rem',
        }}
        rounded="lg"
        border="2px"
        borderColor={border}
        bgColor={bg}
        backdropBlur="lg"
        fontWeight="bold"
        color="white"
        cursor="pointer"
        transition="all 0.3s"
        fontSize={{
            base: '1.5rem',
        }}
    >
        {value?.toUpperCase()}
    </Center>
}