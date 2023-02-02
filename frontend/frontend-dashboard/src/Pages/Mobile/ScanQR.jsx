import {React, useState} from "react";
import QrReader from "react-qr-reader";
import MobileLayout from "../../Component/Layout/MobileLayout";
import qr_scan from "../../Component/Global/qr_scan.png";
//import qr_reader_outline from "../../Component/Global/qr_reader_outline.svg";
import { Link } from "react-router-dom";



const App = () => {
  const [selected, setSelected] = useState("environment");
  //   const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== "") {
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
    <MobileLayout subHeading="scan QR Code">
    <>
      <div className='px-4 py-6 bg-[#F8F8F7] flex-col flex-grow'>
        <h2 className='text-2xl mb-6 font-semibold px-1'>Scan the QR on Item</h2>
        <div className="text-center w-full flex flex-col justify-center items-center">
          <div className="border-[#D2D1CC] rounded-xl border flex-grow p-6 bg-white w-full mx-4 relative">
            <QrReader
              //showViewFinder={false}
              className="rounded-xl"
              facingMode="environment"
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              onResult={() => {}}
              style={{ width: "100%" }}
              videoContainerStyle={{ borderRadius: "20px" }}
            />
            <p className="mt-6">
              Order ID: <div className="inline font-medium"> RO10-445-A65E2 </div>
            </p>
            <p className="mt-2 font-medium text-[#F14336]">
              Unable to scan? <Link to='/verification' className="inline underline">Skip this -> </Link>
            </p>
          </div>
          {/* <p className="mt-2">Lorem ipsum dolor sit amet.</p> */}
          {/* {loadingScan && <p>Loading</p>}
          {data !== "" && <p>{data}</p>} */}
          
        </div>
      </div>
      <div className="w-full bg-white rounded-xl border-[#D2D1CC] border-t">
      <img src={qr_scan} alt="no img" className="h-[107px] w-[100px] mx-12 my-7" />
      </div>
    </>
  </MobileLayout>
);
};

export default App;
