import { gpx } from "@tmcw/togeojson";

import { toKML } from "@placemarkio/tokml";

export function Kml({
  geojson,
  filename,
}: {
  geojson: ReturnType<typeof gpx>;
  filename: string;
}) {
  const kml = toKML(geojson);
  return (
    <div>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(kml)}`}
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
