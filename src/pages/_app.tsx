import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
    return <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
};
export default trpc.withTRPC(MyApp);