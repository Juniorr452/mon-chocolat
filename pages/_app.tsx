import "@fontsource/raleway/400.css"
import "@fontsource/roboto/700.css"

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp