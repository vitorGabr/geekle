import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: (props: any) => ({
            body: {
                bg: 'black',
                minH: '100vh',
            },
        }),
    },
});