import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="URL Shortener" key="title" />
        <meta property="og:desc" content="A simple URL shortener app made with NextJS and MongoDB." key="description" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
