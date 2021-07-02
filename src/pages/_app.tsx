import "@fontsource/raleway/400.css"
import "@fontsource/roboto/700.css"

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"
import { Provider } from "react-redux"
import { store } from "../store"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp