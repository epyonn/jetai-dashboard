// pages/_app.js or pages/_app.tsx
import type { AppProps } from 'next/app';

import '../global.css'; // Adjust the path to where your global.css file is located

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
  }
  
  export default MyApp;