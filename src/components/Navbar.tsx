import { Container, Flex, Heading } from "@chakra-ui/react"

export const Navbar = () => {
    return <Container
        w="100%"
        py={4}
        maxW="container.xl"
    >
        <Flex
            justifyContent="center"
            alignItems="center"
        >
            <Heading
                fontWeight="bold"
                color='white'
            >
                Quizle
            </Heading>
        </Flex>
    </Container>
}