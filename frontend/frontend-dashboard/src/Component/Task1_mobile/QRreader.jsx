import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const App = () => {
  const [selected, setSelected] = useState("environment");
  //   const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      //   setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <h1>
        Scan Bag QR to start <QrCodeScannerIcon />{" "}
      </h1>

      {/* <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button> */}
      {/* {startScan && (
        <> */}
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select>
      <div className="border-black rounded-xl border-2 p-4 ">
        <QrReader
          facingMode={selected}
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          onResult={() => {}}
          // chooseDeviceId={()=>selected}
          style={{ width: "300px" }}
          videoContainerStyle={{ borderRadius: "20px" }}
        />
        {/* </>
      )} */}
        <p className="my-2">
          <b>Bag ID:</b> 235GD57{" "}
          <ArrowOutwardIcon
            className="text-stone-500"
            sx={{ fontSize: "15px" }}
          />
        </p>
      </div>
      {/* {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>} */}
    </div>
  );
};

export default App;
