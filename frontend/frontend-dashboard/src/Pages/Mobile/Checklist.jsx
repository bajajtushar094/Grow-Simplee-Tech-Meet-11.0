import {React, useState} from 'react';
import MobileLayout from '../../Component/Layout/MobileLayout';
import {Link, useNavigate} from 'react-router-dom';
import ChecklistPackage from '../../Component/Mobile/ChecklistPackage';
import { useSelector, useDispatch } from 'react-redux'
import {
  getPackages,
  getTotalDelivered,
  getLoggedIn
} from '../../features/rider/riderSlice';

const Checklist = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector(getLoggedIn);

    if(!loggedIn){
        navigate('/login');
    }

    const packagesStrict = useSelector(getPackages);
    const totalDelivered = useSelector(getTotalDelivered);

    //make an extensible copy of the packages array
    const packages = JSON.parse(JSON.stringify(packagesStrict));

    const continueButton = () => {
        if(totalDelivered === packages.length){
            return null;
        }else{
            return (
                <div className='absolute bottom-0 left-3 right-3 p-3 my-4 text-white font-medium bg-[#2F2E36] rounded-full text-center'><Link to='/singleRoute'>Continue Trip</Link></div>
            );
        }
    }

/* 
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
        
    ]; */

    //loop through all the elements of packages and add a rank property to elements having isDelivered = false. Give rank 1 to the first element and increment rank by 1 for each element.
    let rank = 1;
    for(let i=0; i<packages.length; i++){
        if(packages[i].isDelivered === false){
            packages[i].rank = rank;
            rank++;
        }
    }

    return(
        <MobileLayout subHeading='Item Checklist'>
            <>
                <div className='px-4 py-6 bg-[#F8F8F7] flex-col justify-start mb-16 scroll-m-0'>
                    <h2 className='text-2xl mb-6 font-semibold px-1'>Packages Checklist</h2>
                    {
                        packages.map((item, index) => {
                            return(
                                <ChecklistPackage package={item} index={index+1} key={item.orderId} length={packages.length}/>
                            )
                        })
                    }
                </div>
                {continueButton()}
            </>
        </MobileLayout>
    );
}

export default Checklist;
    