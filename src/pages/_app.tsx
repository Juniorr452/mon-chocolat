import "@fontsource/raleway/400.css"
import "@fontsource/roboto/700.css"

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"
import { Provider } from "react-redux"
import { store } from "../store"
import { makeServer } from "../server"
import { QueryClient, QueryClientProvider } from "react-query"

makeServer({environment: "development"});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp