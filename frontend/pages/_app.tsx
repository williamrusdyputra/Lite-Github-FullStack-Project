import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} basePath="/pixel8labs/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
