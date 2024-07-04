import * as d3 from 'd3'
import { feature } from 'topojson';
import { useColorMode, useTheme } from "@chakra-ui/react"

let svg
let land;
let water;
let projection;
let path;
let SCALE;

export function initialRender(containerRef, svgRef, topoJSONData, theme, colorMode) {
	console.log(theme)
	const landColor = colorMode === 'light'? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark;
	const waterColor = colorMode === 'light'? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark;
	//hardcoded breakpoints
	SCALE = window.innerWidth < 768 ? (window.innerWidth < 480 ? 150 : 250) : 325;
	let width = containerRef.current.clientWidth
    let height = containerRef.current.clientHeight
	projection = d3.geoOrthographic().clipAngle(90).translate([width/2, height/2]).scale(SCALE)
	path = d3.geoPath(projection)

	svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`)
	water = svg.append("g")
	water
		.append("path")
		.datum({type:"Sphere"})
		.attr("d", path).attr("fill", waterColor)
	land = svg.append('g')
	land
		.attr("fill", landColor)
		.attr("cursor", "pointer")
		.selectAll("path")
		.data(feature(topoJSONData, topoJSONData.objects.countries).features)
		.join("path")
		.attr("d", path);
		
}