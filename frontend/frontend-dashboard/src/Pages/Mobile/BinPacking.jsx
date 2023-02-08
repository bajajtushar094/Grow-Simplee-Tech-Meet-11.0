import React, { useEffect, useState } from "react";
import MobileLayout from "../../Component/Layout/MobileLayout";
import { Link, useNavigate } from "react-router-dom";
import CreateBagBoxIcon from "../../Shared/Icons/CreateBagBoxIcon";
import ScanIcon from "../../Shared/Icons/ScanIcon";
import CorrectArrowIcon from "../../Shared/Icons/CorrectArrowIcon";
import cx from "classnames";
import CrossIcon from "../../Shared/Icons/CrossIcon";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoggedIn,
  getPackages,
  setIsInBag,
} from "../../features/rider/riderSlice";
import ThreeDBag from "../../Component/Mobile/ThreeDBag";

const BinPacking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector(getLoggedIn);

  if (!loggedIn) {
    navigate("/login");
  }

  const packages = useSelector(getPackages);

  const [currentPackage, setCurrentPackage] = useState(0);

  useEffect(() => {
    const packagesInBag = packages.filter((item) => item.isInBag);
    console.log(packagesInBag.length, packages.length);
    if (packagesInBag.length === packages.length) {
      navigate("/tripRoute");
    }

    //set current package as the index of the first package that is not in bag
    setCurrentPackage(packages.findIndex((item) => !item.isInBag));
  }, [packages, navigate]);

  const next = () => {
    dispatch(
      setIsInBag({ orderId: packages[currentPackage].orderId, isInBag: true })
    );
    if (currentPackage < packages.length - 1)
      setCurrentPackage(currentPackage + 1);
    else navigate("/tripRoute");
  };

  return (
    <MobileLayout className="text-sm" subHeading="Bag Packing">
      <>
        <div className="px-4 py-6 bg-[#F8F8F7] flex-grow flex-col flex">
          <h2 className="text-2xl mb-6 font-semibold px-1">Create your bag</h2>
          <div className="flex-col flex-grow">
            {/*             {packages.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cx("flex items-center p-3", {
                    "bg-white": item?.isInBag,
                    "rounded-t-xl": index === 0,
                    "rounded-b-xl": index === item.size - 1,
                    "border-b border-[#C5C5C5]": !item?.isInBag,
                  })}
                >
                  <div className="border border-solid p-[14px] rounded-xl border-[#C5C5C5]">
                    <CreateBagBoxIcon />
                  </div>
                  <div className="flex-col w-full px-3">
                    <h4 className="text-[14px] font-semibold">{item.name}</h4>
                    <h4 className="text-xs font-semibold text-gs-text-gray">
                      {item.orderId}
                    </h4>
                  </div>
                  {item?.isCancelled ? (
                    <div className="mx-[8px] my-[6px] w-[36px] h-[36px] rounded-[100%] text-sm p-[12px] items-center justify-center flex bg-[#ea5252]">
                      <CrossIcon />
                    </div>
                  ) : item?.isInBag ? (
                    <div className="mx-[8px] my-[6px] rounded-[100%] text-sm pt-[12px] pb-[13px] px-[10px] items-center justify-center flex bg-[#4CAF50]">
                      <CorrectArrowIcon />
                    </div>
                  ) : (
                    <Link
                      to="/scanQR"
                      state={{
                        orderId: item.orderId,
                        type: "packageScan",
                      }}
                      className="border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]"
                    >
                      <ScanIcon />
                    </Link>
                  )}
                </div>
              );
            })} */}
            <div className="flex items-center p-3 rounded-xl bg-white">
              <div className="border border-solid p-[14px] rounded-xl border-[#C5C5C5]">
                <CreateBagBoxIcon />
              </div>
              <div className="flex-col w-full px-3">
                <h4 className="text-[14px] font-semibold">
                  {packages[currentPackage].name}
                </h4>
                <h4 className="text-xs font-semibold text-gs-text-gray">
                  {packages[currentPackage].orderId}
                </h4>
              </div>
              {packages[currentPackage].isCancelled ? (
                <div className="mx-[8px] my-[6px] w-[36px] h-[36px] rounded-[100%] text-sm p-[12px] items-center justify-center flex bg-[#ea5252]">
                  <CrossIcon />
                </div>
              ) : packages[currentPackage]?.isInBag ? (
                <div className="mx-[8px] my-[6px] rounded-[100%] text-sm pt-[12px] pb-[13px] px-[10px] items-center justify-center flex bg-[#4CAF50]">
                  <CorrectArrowIcon />
                </div>
              ) : (
                <Link
                  to="/scanQR"
                  state={{
                    orderId: packages[currentPackage].orderId,
                    type: "packageScan",
                  }}
                  className="border-2 border-solid p-[14px] rounded-xl border-[#C5C5C5]"
                >
                  <ScanIcon />
                </Link>
              )}
            </div>
            <div className="flex-grow p-4 flex-row flex content-center items-center justify-center object-center">
              {" "}
              <ThreeDBag
                packages={packages}
                currentPackage={currentPackage}
              />{" "}
            </div>
            <div
              onClick={next}
              className="bg-black rounded-full p-4 text-white text-[14px] font-medium m-4 text-center"
            >
              Next Package
            </div>
          </div>
        </div>
      </>
    </MobileLayout>
  );
};

export default BinPacking;
