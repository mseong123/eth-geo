'use client'
import {
    Box,
    useDisclosure,
  } from "@chakra-ui/react"

import { useRef, useState } from 'react'
import React from 'react'
import GeoButtonDropdown from "@/components/GeoButtonDropdown"
import GeoSVG from "@/components/GeoMap/GeoSVG"

import { MAIN_CONTENT_ID } from "@/lib/constants"

const Page = React.forwardRef(({ children}, ref) => {
  return (
    <Box
      as="article"
      h={{base:"65vh", sm:"150vh", md:"70vh"}}
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

//hardcode dropDownItems for now. To write parsing logic in future

const dropDownRegion = [
  {
    text:"South East Asia",
    location:[115.6628, -2.2180],
  },
  {
    text:"East Asia",
    location:[106.5348, 38.7946]
  }
]

dropDownRegion.name="Region"

const dropDownCountry = [
  {
    text:"Thailand",
    location:[100.5018, 13.7563],
  },
  {
    text:"Malaysia",
    location:[101.6841, 3.1319],
  },
  {
    text:"Vietnam",
    location:[108.2772, 14.0583],
  },
  {
    text:"Hongkong",
    location:[114.1694, 22.3193],
  },
  {
    text:"Taiwan",
    location:[120.9605, 23.6978],
  },
  {
    text:"Philippines",
    location:[121.7740, 12.8797],
  },
  {
    text:"China",
    location:[104.1954, 35.8617],
  },
  {
    text:"Singapore",
    location:[103.8198, 1.3521],
  },
  {
    text:"Indonesia",
    location:[106.8229, -6.1944],
  },

]

dropDownCountry.name="Country"

export default function GeoMap({topoJSONData, locationJSON}) {
  const containerRef = useRef(null)
  const [ currentZoom, setZoomed ] = useState(false);
  const [ country, setCountry] = useState(null)
  
  


  return (
      <Page 
        ref={containerRef}
        >
          <GeoButtonDropdown dropDownRegion={dropDownRegion} dropDownCountry={dropDownCountry} currentZoom={currentZoom} pos="absolute" left={{ base: "4", lg: "25%" }} mt={2} ml={2} ></GeoButtonDropdown>
          <GeoSVG country={country} setCountry={setCountry} currentZoom={currentZoom} setZoomed={setZoomed} topoJSONData={topoJSONData} locationJSON={locationJSON} containerRef={containerRef}></GeoSVG>
      </Page>
  )
}