import {
    useTheme,
    useColorMode,
	useDisclosure
  } from "@chakra-ui/react"

import { useEffect, useRef } from 'react'
import React from 'react'
import { renderGlobe, renderLocation, passInitialProps, updateLightDarkTheme} from "@/lib/utils/d3-utilities"
import GeoDrawer from "@/components/GeoMap/GeoDrawer"

export default function GeoSVG({topoJSONData, locationJSON, containerRef, setZoomed, country, setCountry}) {
	const svgRef = useRef(null)
	const theme = useTheme()
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure()
	
	
	useEffect(()=>{
	  passInitialProps(containerRef, svgRef, theme, colorMode, setZoomed, onOpen, setCountry) 
	  renderGlobe(topoJSONData)
	  renderLocation(locationJSON)
	 
	},[])
  
	useEffect(()=>{
	  updateLightDarkTheme(colorMode)
	},[colorMode])
  
	return (
		<>
			<GeoDrawer isOpen={isOpen} onClose={onClose} country={country} locationJSON={locationJSON}></GeoDrawer>
			<svg ref={svgRef}>
				
			</svg>
		</>
		
		
	)
  }