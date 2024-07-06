'use client'
import {
    Box,
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

function dropDownItems(json) {
  const json = array.reduce((acc, value) => {
    if (!acc.includes(value)) {
        acc.push(value);
    }
    return acc;
}, []);
}

export default function GeoMap({topoJSONData, locationJSON}) {
  const containerRef = useRef(null)
  const [ zoomed, setZoomed ] = useState(false);
  // const dropDownItems = dropDownItems(locationJSON)
  console.log(locationJSON)

  return (
      <Page 
        ref={containerRef}
        >
          <GeoButtonDropdown></GeoButtonDropdown>
          <GeoSVG setZoomed={setZoomed} topoJSONData={topoJSONData} locationJSON={locationJSON} containerRef={containerRef}>
          </GeoSVG>
          {zoomed? "Hello":"goodbye"}
      </Page>
  )
}