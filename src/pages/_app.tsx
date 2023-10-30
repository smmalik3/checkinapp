import type { AppProps } from 'next/app'
import '../styles/globals.css'
// Place this at the top of your entry file, e.g., _app.js or index.js
// global.Headers = global.Headers || require('node-fetch').Headers;

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
