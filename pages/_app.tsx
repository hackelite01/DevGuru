import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { withPasswordProtect } from "@storyofams/next-password-protect"
import "../styles/globals.css"
import "./styles.css"
import Script from "next/script"
import Head from "next/head"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>

      {/* adcash
    <Head>
      <meta name="a.validate.02" content="xEkdV1LI-JAJY9zSmK5MVvVezGl0l2ChhAOD" />
    </Head>
    
    

    <Script 
    data-cfasync="false"
     type="text/javascript" 
     data-adel="atag" 
     src="//asacdn.com/script/atg.js" 
     czid="ikrtwx6cwe" 
     />
    */}

      {/* propeller ads
      <Head>
      <meta name="propeller" content="16835aec6473836849046ebbbac20fbc"></meta>
      </Head>
      <Script
        strategy="afterInteractive"
        src="//upgulpinon.com/1?z=5156484"
        
      />
        */}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WMLR3PFFXE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WMLR3PFFXE');
        `}
      </Script>

      <Head>
        <link rel="shortcut icon" href="/images/devguru.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/devguru.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/devguru.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/devguru.png"
        />
      </Head>

      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

// Before: export default App;
export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(App, {
      // Options go here (optional)
      loginApiUrl: "/api/login",
    })
  : App
