import * as d3 from 'd3'
import { feature } from 'topojson';

let svg
let land;
let water;
let location;
let projection;
let path;
let SCALE;
let sens = 0.2;
let theme;
let colorMode;

if (typeof window !== 'undefined') {
	//hardcoded breakpoints
	SCALE = window.innerWidth < 768 ? (window.innerWidth < 480 ? 150 : 250) : 325;
  } else {
	SCALE = 325; // Default scale for server-side rendering
}
let containerWidth;
let containerHeight;


function dragged(event) {
    let rotation = projection.rotate();
    const lambda = event.x;
    const phi = -event.y;
    projection.rotate([lambda * sens, phi * sens, rotation[2]]); 
	svg.selectAll("path").attr("d", path);
	location
		.selectAll("circle")
		.attr('cx', d => projection(d.regionCoordinates)[0])
        .attr('cy', d => projection(d.regionCoordinates)[1])
        .style("display", d => isVisible(d.regionCoordinates)? "block":"none" )
}

const drag = d3.drag()
	.subject(function() {
		const r = projection.rotate();	
		return { x: r[0] / sens, y: -r[1] / sens,z:r[2]};
	})
	.on("drag", dragged);

function isVisible(coords) {
	const [lambda, phi] = projection.rotate();
	const rotated = d3.geoRotation([lambda, phi])(coords);
	return rotated[0] >= -90 && rotated[0] <= 90;
}

function zoomed(event) {
    const {transform} = event;
    const zoomCenterX = containerWidth / 2;
    const zoomCenterY = containerHeight / 2;
    const zoomScale = event.transform.k; // Example: Zoom to scale 2 
    const newX = containerWidth / 2 - zoomCenterX * zoomScale;
    const newY = containerHeight / 2 - zoomCenterY * zoomScale; 
    transform.x = newX;
    transform.y = newY;
    land.attr("transform", transform);
    water.attr("transform", transform)
	location.attr("transform", transform)
}



const zoom = d3.zoom()
    .filter((event)=>{
        return event.type === "dblclick" || event.type === "wheel" || event.type === "pinch"
    })
	.scaleExtent([1, 6])
    .on("zoom", zoomed)

export function passInitialProps(containerRef, svgRef, themeProps, colorModeProps) {
	theme = themeProps;
	colorMode = colorModeProps;
	containerWidth = containerRef.current.clientWidth
	containerHeight = containerRef.current.clientHeight
	projection = d3.geoOrthographic().clipAngle(90).translate([containerWidth/2, containerHeight/2]).scale(SCALE)
	path = d3.geoPath(projection)
	if (!svg || !water || !land || !location) {
		svg = d3.select(svgRef.current)
		water = svg.append("g").attr("id", "water")
		land = svg.append('g').attr("id", "land")
		location = svg.append("g").attr("id", "location")
	}
}

export function updateLightDarkTheme(colorMode) {
	colorMode = colorMode
	water.selectAll("path").attr("fill", colorMode === 'light'? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark)
	land.selectAll("path").attr("fill", colorMode === 'light'? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark)
}


export function renderGlobe(topoJSONData) {
	if (svg) {
		svg
			.attr("id", "globe")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
		svg.call(zoom).call(drag)
	}
	if (water) {
		water
			.append("path")
			.datum({type:"Sphere"})
			.attr("d", path).attr("fill", colorMode === 'light'? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark)
	}
	if (land) {
		land
			.attr("fill", colorMode === 'light'? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark)
			.selectAll("path")
			.data(feature(topoJSONData, topoJSONData.objects.countries).features)
			.join("path")
			.attr("d", path);
	}
	
}
	


export function renderLocation(locationJSON) {
	if (location) {
		location
			.attr("fill", "#D21F3C")
			.attr("cursor", "pointer")
			.selectAll("circle")
			.data(locationJSON)
			.join("circle")
			.attr("cx", d=>projection(d.regionCoordinates)[0])
			.attr("cy", d=>projection(d.regionCoordinates)[1])
			.attr("r", 15)
			.style("display",d=>isVisible(d.regionCoordinates[0])? "block":"none")
	}
}
