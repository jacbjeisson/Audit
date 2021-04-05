import '../styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    50: "#E5EAFF",
    100: "#B8C5FF",
    200: "#8A9FFF",
    300: "#5C7AFF",
    400: "#2E55FF",
    500: "#002FFF",
    600: "#0026CC",
    700: "#1C46FF",
    800: "#001366",
    900: "#000933",
    white: "#EFF5FF"
  },
}

const components = {
  Input: {
    variants: {
      outline: {
        field: {
          borderRadius: "md",
        }
      }
    },
  },
  Badge: {
    baseStyle: {
      h: "18px"
    }
  },
  Button: {
    variants: {
      solid: {
        bg: "brand.700",
        color: "white",
        _hover: {
          bg: "brand.600",
        }
      },
      danger: {
        bg: "red.500",
        color: "white",
        _hover: {
          bg: "red.600",
        }
      },

    },
  },
}
const theme = extendTheme({ colors, components })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
