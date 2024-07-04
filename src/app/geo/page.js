
import { promises as fs } from "fs"
import GeoMap from "@/components/GeoMap"

const fileName = "countries-110m.json"

export default async function Geo() {
  const content = await fs.readFile(process.cwd()+"/src/data/" + fileName, "utf8")
  const topoJSONData = JSON.parse(content)
 

  return (
    <GeoMap topoJSONData={topoJSONData}>
    </GeoMap>
  );
}
