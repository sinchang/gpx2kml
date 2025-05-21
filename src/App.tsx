import { gpx } from "@tmcw/togeojson";
import "./App.css";
import { FileDropzone } from "./File";
import { Kml } from "./Kml";
import React, { useCallback } from "react";

const App = () => {
  const [geojson, setGeojson] = React.useState<ReturnType<typeof gpx> | null>(
    null,
  );
  const [filename, setFilename] = React.useState<string>("file");
  const [isGpx, setIsGpx] = React.useState<boolean>(true);

  const handleDone = useCallback(
    (geojson: ReturnType<typeof gpx>, filename: string, isGpx: boolean) => {
      setGeojson(geojson);
      setFilename(filename);
      setIsGpx(isGpx);
    }, []);

  return (
    <div className="content">
      <h1>GPX {"<=>"} KML</h1>
      <FileDropzone onDone={handleDone} />
      {geojson && <Kml geojson={geojson} filename={filename} isGpx={isGpx} />}
    </div>
  );
};

export default App;
