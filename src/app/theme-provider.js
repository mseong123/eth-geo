'use client'

import { ChakraProvider as OriginalChakraProvider } from "@chakra-ui/provider"
import customTheme from "@/chakra-ui/theme"


export default function ChakraProvider({children}) {
	return (
	
	<OriginalChakraProvider theme={customTheme}>
		
		{children}
	</OriginalChakraProvider>
	)
}