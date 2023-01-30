import { useState } from "react";
import QrReader from "react-qr-reader";
import CallMadeIcon from "@mui/icons-material/ArrowOutward";
import QRinstruction from "../../dummy_files/QRInstructions.png";
import QRscannerIcon from "../../Shared/Icons/QRscanner";

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
    <div className="text-center w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl m-4 flex items-center">
        Scan Bag QR to start{" "}
          <QRscannerIcon className="ml-2" />
      </h1>

      <div className="border-black rounded-xl border-2 p-4 ">
        <QrReader
          facingMode="environment"
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          onResult={() => {}}
          style={{ width: "230px" }}
          videoContainerStyle={{ borderRadius: "20px" }}
        />
        {/* </>
      )} */}
        <p className="mt-4">
          <b>Bag ID:</b> 235GD57{" "}
          <CallMadeIcon
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
