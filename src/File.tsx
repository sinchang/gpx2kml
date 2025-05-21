import { useDropzone } from "react-dropzone";
import { gpx, kml } from "@tmcw/togeojson";
import { useEffect } from "react";

export function FileDropzone({
  onDone,
}: {
  onDone?: (geojson: ReturnType<typeof gpx>, filename: string, isGpx: boolean) => void;
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/gpx+xml": [".gpx", ".kml"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        const decoder = new TextDecoder("utf-8");
        const xmlStr = decoder.decode(binaryStr as ArrayBuffer);
        const dom = new DOMParser().parseFromString(xmlStr, "text/xml");
        const isGpx = dom.getElementsByTagName("gpx").length > 0;
        const geojson = isGpx ? gpx(dom) : kml(dom);
        onDone?.(geojson, file.name.replace(/\.gpx|.kml$/, ""), isGpx);
      };

      reader.readAsArrayBuffer(file);
    }
  }, [acceptedFiles, onDone]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file</p>
      </div>
      {acceptedFiles.length > 0 && (
        <aside>
          <h4>File</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
