import { AppProps } from 'next/app';

import '../styles/global.css';

declare global {
  interface Window {
    pywebview?: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <NextNProgress
        startPosition={0.2}
        stopDelayMs={100}
        height={4}
        // showOnShallow={false}
      /> */}
      <Component {...pageProps} />
    </>
  );
};

export default App;
