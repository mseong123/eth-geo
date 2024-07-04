'use client'

import { ChakraProvider as OriginalChakraProvider } from "@chakra-ui/provider"
import customTheme from "@/chakra-ui/theme"
import { ColorModeScript } from "@chakra-ui/react"


export default function ChakraProvider({children}) {
	return (
	
	<OriginalChakraProvider theme={customTheme}>
	<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
		{children}
	</OriginalChakraProvider>
	)
}