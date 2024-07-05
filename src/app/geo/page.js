
import { promises as fs } from "fs"
import GeoMap from "@/components/GeoMap"
import Papa from 'papaparse';

const topoFileName = "countries-110m.json"
const datafileName = "SEA_data.csv"

const countries = [
  "Thailand ",
  "Malaysia",
  "Singapore",
  "Vietnam",
  "Indonesia",
  "Philippines",
  "China",
  "Taiwan ",
  "Hongkong"
]

const regionMapping = {
  "Thailand ":"SEA",
  Malaysia:"SEA",
  Singapore:"SEA",
  Vietnam:"SEA",
  Indonesia:"SEA",
  Philippines:"SEA",
  China:"EastAsia",
  "Taiwan ":"EastAsia",
  Hongkong:"EastAsia",
}
const coordinatesMapping = {
  SEA:[115.6628, -2.2180],
  EastAsia:[106.5348, 38.7946],
  "Thailand ":[100.9925, 15.8700],
  Malaysia:[101.9758, 4.2105],
  Vietnam:[108.2772, 14.0583],
  Hongkong:[114.1694, 22.3193],
  "Taiwan ":[120.9605, 23.6978],
  Philippines:[121.7740, 12.8797],
  China:[104.1954, 35.8617],
  Singapore:[103.8198, 1.3521],
  Indonesia:[113.9213, -0.7893]
}

function convertData(dataJSON) {
  //split country if there's more than one location and also filter out Global for now
  dataJSON.data.forEach(data=>{
    if (data['Base Where'].includes(',')) 
      data['Base Where']=data['Base Where'].split(",")
    else {
      data['Base Where']=[data['Base Where']]
    }
    data['Base Where'] = data['Base Where'].filter(countries=>{
      return countries !== "Global "
    })
  })
  //split organizations by regions/country
  const result = countries.map(country=>{
    let organisations = dataJSON.data.filter(data=>{
      if (data['Base Where'].includes(country))
        return data
    })
    return {
      region:regionMapping[country],
      regionCoordinates:coordinatesMapping[regionMapping[country]],//[longtitude,latitude]
      country:country,
      countryCoordinates:coordinatesMapping[country], //[longtitude,latitude]
      organisationData:organisations //array
    }
  })
  return result
}


export default async function Geo() {
  const content = await fs.readFile(process.cwd()+"/src/data/" + topoFileName, "utf8")
  const topoJSONData = JSON.parse(content)
  const data = await fs.readFile(process.cwd()+"/src/data/" + datafileName, "utf8")
  const dataJSON = Papa.parse(data, {header:true})
  const locationJSON = convertData(dataJSON)

  return (
    <GeoMap topoJSONData={topoJSONData} locationJSON={locationJSON}>
    </GeoMap>
  );
}
