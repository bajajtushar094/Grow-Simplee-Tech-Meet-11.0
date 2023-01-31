import React from 'react';
import CorrectArrowIcon from '../../Shared/Icons/CorrectArrowIcon';
import CreateBagBoxIcon from '../../Shared/Icons/CreateBagBoxIcon';
import CrossIcon from '../../Shared/Icons/CrossIcon';
import PickupPackageIcon from '../../Shared/Icons/PickupPackage';

const ChecklistPackage = (props) => {

    const details = props.package;

    let color='', vector=null, icon=null, borderColor=null, borderCorner='';

    if(details.isNew){
        color='FC8019';
        borderColor = 'border-[#FC8019]';
    }else if(details.type === 'delivery'){
        color='F14336'
        borderColor = 'border-[#F14336]';
    }else{
        color='765BF4'
        borderColor = 'border-[#765BF4]';
    }

    if(details.type === 'delivery'){
        icon = <CreateBagBoxIcon/>;
    }else{
        icon = <PickupPackageIcon/>;
    }

    if(details.id===1){
        borderCorner = 'rounded-tl-xl rounded-tr-xl';
    }else if(details.id === props.length){
        borderCorner = 'rounded-bl-xl rounded-br-xl';
    }

    if(details.isVerified){
        vector = <div className='mx-[8px] my-[6px] rounded-[100%] text-sm pt-[12px] pb-[13px] px-[10px] items-center justify-center flex bg-[#4CAF50]'><CorrectArrowIcon /></div>;
    }else if(details.isCancelled){
        vector = <div className='mx-[8px] my-[6px] w-[36px] h-[36px] rounded-[100%] text-sm p-[12px] items-center justify-center flex bg-[#ea5252]'><CrossIcon /></div>;
    }else{
        vector = <div className='w-[48px] h-[48px] border border-solid rounded-xl border-[#231F20]/[.50] flex items-center justify-center text-[24px] text-black font-semibold'><div>{details.rank}</div></div>
    }

    return(
        <div className={`p-3 bg-white border border-[#C5C5C5] ${borderCorner}`}>
            {
                details.isNew?
                <div className='w-fit mb-3 px-3 py-1 bg-[#4CAF50] border border-[#296E2C] text-[12px] rounded-full text-white'>● New Pickup Added</div>
                :null
            }
            <div className='flex flex-row items-center'>
                <div className={`border border-solid p-[${details.type==='pickup' ? '12px' : '14px'}] rounded-xl ${borderColor} bg-[#${color}]/[.30]`}>{icon}</div>
                <div className='flex-grow ml-3 flex flex-col justify-center'>
                    <div className='font-medium text-[#272520] text-[14px]'>{details.name}</div>
                    <div className='text-[12px] text-[#777777]'>{details.orderId}</div>
                </div>
                {vector}
            </div>
            <div className='mt-3 text-[14px] text-[#272520] font-medium'>{details.textAddress}</div>
        </div>
    );
}

export default ChecklistPackage;