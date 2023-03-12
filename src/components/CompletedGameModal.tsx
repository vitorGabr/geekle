import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const CompletedGameModal = ({
    ...props
}: Props) => {
    return <Modal
        {...props}
        isCentered
    >
        <ModalOverlay
            bg='rgba(22, 22, 22, 0.5)'
            backdropFilter='auto'
            backdropBlur='2px'
        />
        <ModalContent>
            <ModalHeader>Processo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex>

                </Flex>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                    Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}