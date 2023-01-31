import {React, useState} from 'react';
import MobileLayout from '../../Component/Layout/MobileLayout';
import {Link} from 'react-router-dom';
import ChecklistPackage from '../../Component/Mobile/ChecklistPackage';

const Checklist = (props) => {

    const packages = [
        {
            id: 1,
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isVerified: true,
            isCancelled: false,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
            rank: 0,
        },
        {
            id: 2,
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isVerified: false,
            isCancelled: true,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'pickup',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
            rank: 0,
        },
        {
            id: 3,
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isVerified: false,
            isCancelled: false,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: false,
            rank: 1,
        },
        {
            id: 4,
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isVerified: false,
            isCancelled: false,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'pickup',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India',
            isNew: true,
            rank: 2,
        },
        {
            id: 5,
            name: 'Darrell Steward',
            orderId: 'RO10-445-A65E2',
            isVerified: false,
            isCancelled: false,
            latitude: 26.189605193409417, 
            longitude: 91.69294796870521, 
            type:'delivery',
            textAddress: 'Brahmaputra Hostel, Guwahati, Assam, India - 781039',
            isNew: false,
            rank: 3,
        },
        
    ];

    return(
        <MobileLayout subHeading='Item Checklist'>
            <>
                <div className='px-4 py-6 bg-[#F8F8F7] flex-col justify-start'>
                    <h2 className='text-2xl mb-6 font-semibold px-1'>Delivery ordering</h2>
                    {
                        packages.map((item) => {
                            return(
                                <ChecklistPackage package={item} key={item.id} length={packages.length}/>
                            )
                        })
                    }
                </div>
                <div className='absolute bottom-0 left-3 right-3 p-3 my-4 text-white font-medium bg-[#2F2E36] rounded-full text-center'><Link to='/tripRoute'>Continue Trip</Link></div>
            </>
        </MobileLayout>
    );
}

export default Checklist;
    