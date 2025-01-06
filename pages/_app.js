import { AnimatePresence } from "framer-motion";
import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <AnimatePresence mode="wait" initial={false}>
    <span className="theme-bejamas" />
      <Component {...pageProps} />
      </AnimatePresence>

    </>
  );
}

export default MyApp;
