import {
    useTheme,
    useColorMode,
	Box
  } from "@chakra-ui/react"

import { useEffect, useRef } from 'react'
import React from 'react'
import { renderGlobe, renderLocation, passInitialProps, updateLightDarkTheme} from "@/lib/utils/d3-utilities"

export default function GeoSVG({topoJSONData, locationJSON, containerRef, setZoomed, children}) {
	const svgRef = useRef(null)
	const theme = useTheme()
	const { colorMode } = useColorMode();
	
	useEffect(()=>{
	  passInitialProps(containerRef, svgRef, theme, colorMode, setZoomed) 
	  renderGlobe(topoJSONData)
	  renderLocation(locationJSON)
	},[])
  
	useEffect(()=>{
	  updateLightDarkTheme(colorMode)
	},[colorMode])
  
	return (
		<Box>
			{children}
			<svg ref={svgRef}></svg>
		</Box>
		
		
	)
  }