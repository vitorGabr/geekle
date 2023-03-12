import { Badge, Flex, ScaleFade } from "@chakra-ui/react"

export const BadgeStatus = ({ value }: { value: string }) => {
    return <Flex
        zIndex={1000000}
        w={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
    >
        <ScaleFade initialScale={0.9} in={true}>
            <Badge
                variant="solid"
                colorScheme={'blue'}
                w={'auto'}
                color={'black'}
                fontWeight={'bold'}
                px={1}
            >
                {value}
            </Badge>
        </ScaleFade>
    </Flex>

}