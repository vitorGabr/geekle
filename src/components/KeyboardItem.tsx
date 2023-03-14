import { WordResultType } from '@/types/enums/WordResultType';
import { Center } from '@chakra-ui/react';
import { Delete } from 'lucide-react';
import { ComponentProps, useMemo } from 'react';

type Props = {
    onClick: () => void;
    result?: WordResultType;
    value?: string;
};

export const KeyBoardItem = ({ onClick, value, result }: Props) => {

    let bg: ComponentProps<typeof Center>['bgColor'] = useMemo(() => {
        switch (result) {
            case WordResultType.CORRECT:
                return 'green.600';
            case WordResultType.INCORRECT:
                return 'red.600';
            case WordResultType.ALMOST:
                return 'yellow.600';
            default:
                return 'gray.800';
        }
    }, [result]);

    if (value === 'Backspace') {
        return (
            <Center
                onClick={onClick}
                borderRadius="lg"
                border={'2px'}
                borderColor={'red.900'}
                px={4}
                bgColor={'red.600'}
                cursor="pointer"
                color={'white'}
            >
                <Delete />
            </Center>
        );
    }

    if (value === 'Enter') {
        return (
            <Center
                onClick={onClick}
                borderRadius="lg"
                border={'2px'}
                borderColor={'green.900'}
                px={4}
                bgColor={'green.600'}
                cursor="pointer"
                color={'white'}
                fontWeight={'bold'}
            >
                Enter
            </Center>
        );
    }

    return (
      <Center
        onClick={onClick}
        w={{
          base: '10%',
          md: '3.5vw',
        }}
        h={{
          base: '8vh',
          md: '3.5vw',
        }}
        maxW={20}
        maxH={20}
        bgColor={bg}
        rounded="lg"
        color={'white'}
        fontSize={['xl', 'xl', 'xl', '2xl']}
        fontWeight={'bold'}
        cursor="pointer"
        _hover={{
          bg: 'gray.700',
        }}
        transition="all ease 0.2s"
      >
        {value?.toLocaleUpperCase()}
      </Center>
    );
};
