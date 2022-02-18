import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import '../styles/global.css';
import 'antd/dist/antd.css';

declare global {
  interface Window {
    pywebview?: any;
  }
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        startPosition={0.2}
        stopDelayMs={100}
        height={1}
        showOnShallow={false}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
