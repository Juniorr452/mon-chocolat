import "@fontsource/raleway/400.css"
import "@fontsource/roboto/700.css"

import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"
import { Provider } from "react-redux"
import { store } from "../store"
import { makeServer } from "../server"
import { QueryClient, QueryClientProvider } from "react-query"
import { createServer, Response } from "miragejs"
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from 'next/head'
import TopNav from "../components/Layout/TopNav"
import Footer from "../components/Layout/Footer"
import { AnimatePresence } from "framer-motion"
import { AppProps } from "next/dist/next-server/lib/router/router"
import SplashScreen from "../components/SplashScreen"

if(process.browser) {
  if ((window as any).Cypress) {
    let otherDomains = []
    let methods = ["get", "put", "patch", "post", "delete"]
  
    createServer({
      environment: "test",
      routes() {
        for (const domain of ["/", ...otherDomains]) {
          for (const method of methods) {
            this[method](`${domain}*`, async (schema, request) => {
              let [status, headers, body] = await (window as any).handleFromCypress(
                request
              )
              return new Response(status, headers, body)
            })
          }
        }
      },
    })
  } else {
    makeServer({environment: process.env.NODE_ENV});
  }
}

const queryClient = new QueryClient();

const Providers: React.FC = ({children}) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
)

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Providers>
      <Head>
        <meta name="description" content="Mon chocolat fait par Ênio Júnior" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SplashScreen>
        <TopNav />

        <AnimatePresence 
          exitBeforeEnter 
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
        
        <Footer />
      </SplashScreen>

    </Providers>
  )
}

export default MyApp