// import { CssBaseline } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/fonts.css';
import '../styles/global.css';

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
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default App;
