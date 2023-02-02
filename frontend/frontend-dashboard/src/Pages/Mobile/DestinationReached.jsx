import React, { useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Map from '../../Component/Mobile/Map'
import PackageDetails from '../../Component/Mobile/PackageDetails'
import { useSelector, useDispatch } from 'react-redux'
import {
    getPackages,
    setIsAtWarehouse,
    getTotalDelivered,
    getIsAtWarehouse,
    getIsBagScanned,
    getLoggedIn
    //setIsDelivered,
    //setIsFailed,


  } from '../../features/rider/riderSlice';

const DestinationReached = () => {

    const packages = useSelector(getPackages);
    const loggedIn = useSelector(getLoggedIn);
    const navigate = useNavigate();  
    if(!loggedIn){
        navigate('/login');
    }
    const isAtWarehouse = useSelector(getIsAtWarehouse);
    const totalDelivered = useSelector(getTotalDelivered);
    const isBagScanned = useSelector(getIsBagScanned);

    const dispatch = useDispatch();
    const location = useLocation();

    const destination = location.state.package;

    if(destination.status === 'warehouse'){
        dispatch(setIsAtWarehouse(true));
    }

    if(!isBagScanned){
        //window.location.href = '/login';
    }

    return (
        <MobileLayout subHeading='Destination Reached'>
            <>
                <PackageDetails coordinates={destination}/>
                <Map coordinates = {[destination]} className='flex-grow z-0'></Map>
                <div className='bottom_bar absolute inset-x-0 bottom-0 rounded-t-[12px] bg-white px-4 py-6 border border-[#D2D1CC] z-10'>
                    <div className='buttons flex text-center font-semibold'>
                        <Link 
                            to='/scanQR'  
                            state={{
                                orderId: destination.orderId? destination.orderId: '',
                                type: 'packageDelivery'
                            }}
                            
                            className='rounded-full flex-1 py-3 bg-[#2F2E36] text-white'
                        >
                            Scan QR Code</Link>
                    </div>
                </div>
            </>
        </MobileLayout>
    )
}

export default DestinationReached;