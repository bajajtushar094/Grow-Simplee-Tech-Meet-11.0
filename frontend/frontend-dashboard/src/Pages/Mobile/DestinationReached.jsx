import React, { useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link} from 'react-router-dom'
import Map from '../../Component/Mobile/Map'
import PackageDetails from '../../Component/Mobile/PackageDetails'

const DestinationReached = () => {

    const coordinates = [
        {latitude: 26.189605193409417, longitude: 91.69294796870521, status:'pickup'},
    ];

    return (
        <MobileLayout subHeading='Destination Reached'>
            <>
                <PackageDetails coordinates={coordinates[0]}/>
                <Map coordinates = {coordinates} className='flex-grow z-0'></Map>
                <div className='bottom_bar absolute inset-x-0 bottom-0 rounded-t-[12px] bg-white px-4 py-6 border border-[#D2D1CC] z-10'>
                    <div className='buttons flex text-center font-semibold'>
                        <Link to='/scanQR'  className='rounded-full flex-1 py-3 bg-[#2F2E36] text-white'>Scan QR Code</Link>
                    </div>
                </div>
            </>
        </MobileLayout>
    )
}

export default DestinationReached;