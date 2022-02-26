import { AppProps } from 'next/app';

// import '../styles/global.css';

declare global {
  interface Window {
    pywebview?: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
