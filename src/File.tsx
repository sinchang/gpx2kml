import { useDropzone } from "react-dropzone";
import { gpx } from "@tmcw/togeojson";

export function FileDropzone({
  onDone,
}: {
  onDone?: (geojson: ReturnType<typeof gpx>, filename: string) => void;
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/gpx+xml": [".gpx"],
    },
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      const decoder = new TextDecoder("utf-8");
      const xmlStr = decoder.decode(binaryStr as ArrayBuffer);
      const gpxDom = new DOMParser().parseFromString(xmlStr, "text/xml");
      const geojson = gpx(gpxDom);
      onDone?.(geojson, file.name.replace(/\.gpx$/, ""));
    };
    reader.readAsArrayBuffer(file);
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file</p>
      </div>
      {files.length > 0 && (
        <aside>
          <h4>File</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </section>
  );
}
