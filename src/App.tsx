import { gpx } from "@tmcw/togeojson";
import "./App.css";
import { FileDropzone } from "./File";
import { Kml } from "./Kml";
import React from "react";

const App = () => {
  const [geojson, setGeojson] = React.useState<ReturnType<typeof gpx> | null>(
    null,
  );
  const [filename, setFilename] = React.useState<string>("file");
  const handleDone = (geojson: ReturnType<typeof gpx>, filename: string) => {
    setGeojson(geojson);
    setFilename(filename);
  };

  return (
    <div className="content">
      <h1>GPX to KML</h1>
      <FileDropzone onDone={handleDone} />
      {geojson && <Kml geojson={geojson} filename={filename} />}
    </div>
  );
};

export default App;
