import { AnimatePresence } from "framer-motion";
import { ApolloProvider } from '@apollo/client'; 
import client from '../utils/apollo-client';
import '../styles/globals.css';
import 'video.js/dist/video-js.css';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
 

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const publicRoutes = ['/', '/login', '/register','/about', '/posts', '/posts/[slug]', '/graphql'];
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!publicRoutes.includes(router.pathname)) {
        if (token) {
          try {
            await axios.post(process.env.NEXT_PUBLIC_WPURL + '/wp-json/jwt-auth/v1/token/validate', {}, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (err) {
            localStorage.removeItem('token');
            localStorage.setItem('redirectTo', router.pathname);
            router.push('/login');
          }
        } else {
          localStorage.setItem('redirectTo', router.pathname);
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <>
    <ApolloProvider client={client}> 
    <AnimatePresence mode="wait" initial={false}>
    <span className="theme-bejamas" />
      <Component {...pageProps} />
     </AnimatePresence>
    </ApolloProvider>
    </>
  );
}

export default MyApp;
