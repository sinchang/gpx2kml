import { gpx } from "@tmcw/togeojson";

import tokml from "tokml";
import togpx from '@dwayneparton/geojson-to-gpx'

export function Kml({
  geojson,
  filename,
  isGpx
}: {
  geojson: ReturnType<typeof gpx>;
  filename: string;
  isGpx: boolean;
}) {
  const xml = !isGpx ? new XMLSerializer().serializeToString(togpx(geojson)) : tokml(geojson).replace(/\[object Object\]/ig, '')
  return (
    <div>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(xml)}`}
        download={`${filename}.${!isGpx ? "gpx" : "kml"}`}
        style={{
          display: "block",
          marginBottom: "10px",
          color: "#c9c9f9",
          textDecoration: "none",
        }}
      >
        Download {isGpx ? 'KML' : "GPX"} file
      </a>
    </div>
  );
}
