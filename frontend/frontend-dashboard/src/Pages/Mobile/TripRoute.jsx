import React, { useState } from 'react'
import MobileLayout from '../../Component/Layout/MobileLayout'
import {Link} from 'react-router-dom'
import Map from '../../Component/Mobile/Map'
import DeliveryStatus from '../../Component/Mobile/DeliveryStatus'
import PickupStatus from '../../Component/Mobile/PickupStatus'

const TripRoute = () => {

    const [routeDetails, setRouteDetails] = React.useState({
        distance: 0,
        time_required: '',
        time_to_reach: ''
    });
        
    const setRouteSummary = (summary) => {
        //let distance = Math.round(summary.totalDistance / 100)/10;
        let distance = Math.round(summary.totalDistance/1000);
        let time_required = '';
        if(Math.round(summary.totalTime / (60*60)) !== 0){
            time_required = Math.round(summary.totalTime / (60*60)) + ' h ' + Math.round(summary.totalTime % 3600 / 60) + ' min'; 
        }else{
            time_required = Math.round(summary.totalTime % 3600 / 60) + ' min';
        }
        let date = new Date();
        date = new Date(date.getTime() + (summary.totalTime * 1000));

        setRouteDetails({
            distance: distance,
            time_required: time_required,
            time_to_reach: date.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })
        });
    }


    const coordinates = [
        {latitude: 26.189605193409417, longitude: 91.69294796870521, status:'delivery'},
        {latitude: 26.166979228463582, longitude: 91.75049812487305, status:'pickup'},
        {latitude: 26.177219357664082, longitude: 91.76409504583465, status:'delivery'},
    ];
    return (
        <MobileLayout subHeading='Trip Route'>
            <>
            <div className='absolute top-0 left-0 z-10 px-4 py-3'>
                <DeliveryStatus className='pb-2'/>
                <div className='h-1'></div>
                <PickupStatus/>
            </div>
            <Map coordinates={coordinates} setRouteSummary = {setRouteSummary} className='flex-grow z-0'/>
            <div className='bottom_bar absolute inset-x-0 bottom-0 rounded-t-[12px] bg-white px-4 py-6 border border-[#D2D1CC]'>
                <div className='time_distance text-xl pb-1'>
                    <div className='time text-[#4CAF50] inline-block font-medium'>{routeDetails.time_required} &nbsp;</div>
                    <div className='distance inline-block font-normal'>{routeDetails.distance} km</div>
                </div>
                <div className='info text-gs-text-gray text-[14px] pb-3 '>Fastest possible route, usual traffic</div>
                <div className='buttons flex text-center font-semibold'>
                    <div className='checklist_button rounded-full flex-1 py-3 border-[#2F2E36] border mr-2'>Checklist</div>
                    <Link to='/singleRoute' className='start_button rounded-full flex-1 py-3 bg-[#2F2E36] text-white'>Start Trip</Link>
                </div>
            </div>
            </>

        </MobileLayout>
    )
}

export default TripRoute