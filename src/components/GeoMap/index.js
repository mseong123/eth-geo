'use client'
import {
    Box,
    useTheme,
    useColorMode,
  } from "@chakra-ui/react"

  import { useEffect, useRef } from 'react'
  import React from 'react'
  import * as d3 from 'd3'
  
  import { MAIN_CONTENT_ID } from "@/lib/constants"
  import { initialRender } from "@/lib/utils/d3-utilities"

  const Page = React.forwardRef(({ children}, ref) => {
    return (
      <Box
        as="article"
        h={{base:"60vh", sm:"150vh", md:"75vh"}}
        w="full" 
        p={{ base: "4", lg: "8" }}
        mx="auto"
        id={MAIN_CONTENT_ID}
        scrollMarginTop={24}
        ref={ref}
        
        >
        {children}
      </Box>
    )
  })

Page.displayName=Page

  export default function GeoMap({topoJSONData}) {
    const svgRef = useRef(null)
    const containerRef = useRef(null)
    const theme = useTheme()
    const { colorMode } = useColorMode();
    

    useEffect(()=>{ 
        initialRender(containerRef, svgRef, topoJSONData, theme, colorMode)
        
        
    },[containerRef, colorMode])

    return (
        <Page 
          ref={containerRef}
          
          >
            <svg 
                ref={svgRef}
            ></svg>
        </Page>
    )
  }