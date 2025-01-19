import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'github-markdown-css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Bruce" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp 