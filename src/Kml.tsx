import { gpx } from "@tmcw/togeojson";

import tokml from "tokml";

export function Kml({
  geojson,
  filename,
}: {
  geojson: ReturnType<typeof gpx>;
  filename: string;
}) {
  const xml = tokml(geojson).replace(/\[object Object\]/ig, '')
  return (
    <div>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(xml)}`}
        download={`${filename}.kml`}
        style={{
          display: "block",
          marginBottom: "10px",
          color: "#c9c9f9",
          textDecoration: "none",
        }}
      >
        Download KML file
      </a>
    </div>
  );
}
