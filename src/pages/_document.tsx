import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=optional" rel="stylesheet" />
        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
