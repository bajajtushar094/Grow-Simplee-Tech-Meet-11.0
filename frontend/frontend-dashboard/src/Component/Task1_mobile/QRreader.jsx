import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import QRinstruction from "../../dummy_files/QRInstructions.png";

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
      <h1 className="text-2xl m-4">
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
      {/* <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select> */}
      <div className="border-black rounded-xl border-2 p-4 ">
        <QrReader
          facingMode="environment"
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          onResult={() => {}}
          // chooseDeviceId={()=>selected}
          style={{ width: "230px" }}
          videoContainerStyle={{ borderRadius: "20px" }}
        />
        {/* </>
      )} */}
        <p className="mt-4">
          <b>Bag ID:</b> 235GD57{" "}
          <ArrowOutwardIcon
            className="text-stone-500"
            sx={{ fontSize: "15px" }}
          />
        </p>
      </div>
      <p className="mt-2">Lorem ipsum dolor sit amet.</p>
      {/* {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>} */}
      <img src={QRinstruction} alt="no img" className="fixed bottom-0" />
    </div>
  );
};

export default App;
