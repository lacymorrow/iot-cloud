import { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/global.scss';
import MainLayout from '@/layouts/MainLayout';

declare global {
  interface Window {
    pywebview?: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default App;
