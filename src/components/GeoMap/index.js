'use client'
import {
    Box,
    Flex,
    useTheme,
  } from "@chakra-ui/react"

  import { useEffect, useRef } from 'react'
  import * as d3 from 'd3'
  import { feature } from 'topojson';
  import { MAIN_CONTENT_ID } from "@/lib/constants"

  const Page = ({ children }) => {
    return (
      <Box
        as="article"
        h="80vh" 
        w="full" 
        p={{ base: "4", lg: "8" }}
        mx="auto"
        id={MAIN_CONTENT_ID}
        scrollMarginTop={24}
        >
        {children}
      </Box>
    )
  }

  export default function GeoMap({topoJSONData}) {
    const svgRef = useRef(null)
    const containerRef = useRef(null)
    useEffect(()=>{
        let width = containerRef.current.clientWidth
        let height = containerRef.current.clientHeight
        const projection = d3.geoOrthographic().clipAngle(90).scale(350)
        const path = d3.geoPath(projection)
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`)
        const land = 
            svg.append('g')
        land
            .attr("fill", "#444")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(feature(topoJSONData, topoJSONData.objects.countries).features)
            .join("path")
            .attr("d", path);
        // window.addEventListener('resize', function(){
        //         width = 
        //     });
    },[containerRef,svgRef])
    return (
        <Page ref={containerRef}>
            <svg 
                ref={svgRef}
            ></svg>
        </Page>
    )
  }