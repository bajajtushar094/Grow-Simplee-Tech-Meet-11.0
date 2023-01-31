import React from "react";
import DeliveryStatus from "./DeliveryStatus";
import PickupStatus from "./PickupStatus";
import CreateBagBoxIcon from '../../Shared/Icons/CreateBagBoxIcon';

const PackageDetails = (props) => {

    let statusCard = null;
    if(props.coordinates.status === 'delivery'){
        statusCard = <DeliveryStatus/>
    }else{
        statusCard = <PickupStatus/>
    }

    return(
        <div className='flex flex-row items-center px-4 py-4 border border-[#D2D1CC] bg-white'>
            <div className='border-[1px] border-solid p-[14px] rounded-full border-[#C5C5C5]'><CreateBagBoxIcon/></div>
            <div className='package_details flex-grow pl-4 flex flex-col'>
                <div className='package_name text-[14px] font-medium text-[#272520]'>Darrell Steward</div>
                <div className='order_number text-[12px] text-[#777777]'>RO10-445-A65E2</div>
            </div>
            {statusCard}
        </div>
    )
}

export default PackageDetails;