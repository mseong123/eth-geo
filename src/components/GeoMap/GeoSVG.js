import {
    useTheme,
    useColorMode,
	useDisclosure
  } from "@chakra-ui/react"

import { useEffect, useRef } from 'react'
import React from 'react'
import { renderGlobe, renderLocation, passInitialProps, updateLightDarkTheme, updateZoom} from "@/lib/utils/d3-utilities"
import GeoDrawer from "@/components/GeoMap/GeoDrawer"

export default function GeoSVG({topoJSONData, locationJSON, containerRef, currentZoom, setZoomed, country, setCountry}) {
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

	useEffect(()=>{
		updateZoom(currentZoom)
	   
	  },[currentZoom])
  
	return (
		<>
			<GeoDrawer isOpen={isOpen} onClose={onClose} country={country} locationJSON={locationJSON}></GeoDrawer>
			<svg ref={svgRef}>
				
			</svg>
		</>
		
		
	)
  }