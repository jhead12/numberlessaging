import { AnimatePresence } from "framer-motion";
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';
import '../styles/globals.css';
import 'video.js/dist/video-js.css';
import 'prismjs/themes/prism-tomorrow.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <ApolloProvider client={client}>
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} />
     </AnimatePresence>
    </ApolloProvider>
    </>
  );
}

export default MyApp;