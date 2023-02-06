import {React, useState} from "react";
import QrReader from "react-qr-reader";
import MobileLayout from "../../Component/Layout/MobileLayout";
import qr_scan from "../../Component/Global/qr_scan.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { 
  getLoggedIn,
  setIsBagScanned,
  getIsBagScanned,
  getBagId,
  setIsInBag,
  setIsDelivered,
  setIsFailed,
  getPackages,
  setIsCancelled,
  setIsAtWarehouse,

} from '../../features/rider/riderSlice';


const App = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector(getLoggedIn);

  if(!loggedIn){
    navigate('/login');
  }

  const isBagScanned = useSelector(getIsBagScanned);
  const bagId = useSelector(getBagId);
  const packages = useSelector(getPackages);

  
  /* if(isBagScanned){
    navigate('/createBag');
  } */


  const dataReceived = location.state;
  const type = dataReceived.type;
  const item = packages.find((p) => p.orderId === dataReceived.orderId);


  //const [selected, setSelected] = useState("environment");
  //   const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");


  const handleScan = (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== "") {
      setData(scanData);
      checkScan();
      //   setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const checkScan = () => {
    if(type==='scanBag'){
      if(data === bagId){
        dispatch(setIsBagScanned(true));
        navigate('/createBag');
      }else{
        alert('Wrong Bag ID');
      }
      
    }else if(type==='packageScan'){
      if(data === item.orderId){
        dispatch(setIsInBag({orderId: item.orderId, isInBag: true}));
        navigate('/createBag');
      }else{
        alert('Wrong Package ID');
      }
      
    }else if(type==='packageDelivery'){
      if(data === item.orderId){
        //dispatch(setIsDelivered({orderId: item.orderId, isDelivered: true}));
        navigate('/verification',
          {
            state: {
              orderId: item.orderId,
              type: item.type
            }
          }
        );
      }else{
        alert('Wrong Package ID');
      }
    }
  }

  const skipScan = (e) => {
    if(type==='scanBag'){
      dispatch(setIsBagScanned(true));
      navigate('/createBag');
    }else if(type==='packageScan'){
      dispatch(setIsInBag({orderId: item.orderId, isInBag: true}));
      dispatch(setIsCancelled({orderId: item.orderId, isCancelled: true}));
      navigate('/createBag');
    }else if(type==='packageDelivery'){
      dispatch(setIsDelivered({orderId: item.orderId, isDelivered: true}));
      dispatch(setIsFailed({orderId: item.orderId, isFailed: true}));
      navigate('/singleRoute');
    }
  }



  return (  
    <MobileLayout subHeading="Scan QR Code">
      <>
        <div className='px-4 py-6 bg-[#F8F8F7] flex-col flex-grow'>
          <h2 className='text-2xl mb-6 font-semibold px-1'>{type==='scanBag' ? 'Scan the QR on Bag ': 'Scan the QR on Item'}</h2>
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
                {type==='scanBag' ? 'Bag ID: ': 'Order ID: '} 
                <div className="inline font-medium"> 
                  {type==='scanBag' ? bagId : dataReceived.orderId} 
                </div>
              </p>
              <p className="mt-2 font-medium text-[#F14336]">
                Unable to scan? <button onClick={skipScan} className="inline underline">Skip this </button>
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