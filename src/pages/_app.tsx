import "@fontsource/raleway/400.css"
import "@fontsource/roboto/700.css"

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"
import { Provider } from "react-redux"
import { store } from "../store"
import { makeServer } from "../server"
import { QueryClient, QueryClientProvider } from "react-query"
import { createServer, Response } from "miragejs"
import { ReactQueryDevtools } from 'react-query/devtools'

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

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp