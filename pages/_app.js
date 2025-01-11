import { AnimatePresence } from "framer-motion";
import { ApolloProvider } from '@apollo/client'; 
import client from '../utils/apollo-client';
import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ApolloProvider client={client}> 
    <AnimatePresence mode="wait" initial={false}>
    <span className="theme-bejamas" />
      <Component {...pageProps} />
      </AnimatePresence>
      {/* <Component {...pageProps} />  */}
    </ApolloProvider>
    

  
 
    </>
  );
}

export default MyApp;
