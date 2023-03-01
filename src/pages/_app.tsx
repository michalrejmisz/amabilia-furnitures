// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import {ShoppingCartProvider} from "@/context/ShoppingCartContext";
import { CookiesProvider } from "react-cookie";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { NextSeo } from 'next-seo';
import {DefaultSeo} from 'next-seo';
import { GoogleAnalytics } from "nextjs-google-analytics";
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
import type AppContext from "next";
import generateSitemapXml from "./sitemap.xml";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps)
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page : ReactNode) => page)

  return (
      <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY.toString()}
          language="pl"
      >
          <CookiesProvider>
              <ApolloProvider client={apolloClient}>
                <ShoppingCartProvider>
                    <GoogleAnalytics trackPageViews />
                    <DefaultSeo
                        title="Amabilia - używane meble biurowe poleasingowe Poznań Wielkopolska"
                        description="Amabilia używane meble biurowe to sklep zajmujący się sprzedażą biurek, krzeseł, foteli obrotowych, recepcjii oraz wielu innych elementów wyposażenia biura.
                        U nas kupisz wysokiej jakości produkty w rozsądnej cenie."
                        openGraph={{
                            type: 'website',
                            locale: 'pl-PL',
                            url: 'https://www.amabilia-meble.pl/',
                            siteName: 'Amabilia - używane meble biurowe poleasingowe',
                            images: [
                                {
                                    url: `/mediaThumbnail.webp`,
                                    alt: 'Miniaturka',
                                }
                            ]
                        }}
                    />
                    {getLayout(<Component {...pageProps} />)}
                </ShoppingCartProvider>
              </ApolloProvider>
          </CookiesProvider>
      </GoogleReCaptchaProvider>
  )
}
