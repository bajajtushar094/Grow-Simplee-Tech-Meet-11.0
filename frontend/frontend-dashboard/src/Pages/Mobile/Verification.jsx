import {React, useState} from 'react';
import MobileLayout from '../../Component/Layout/MobileLayout';
import {Link} from 'react-router-dom';
import OtpInput from 'react-otp-input';

const Verification = (props) => {

    const [otp, setOtp] = useState('');


    return (
        <MobileLayout subHeading='Delivery Verification'>
            <>
            <div className='px-4 py-6 bg-[#F8F8F7] flex-col flex-grow relative'>
                <h2 className='text-2xl mb-10 font-semibold px-1'>Enter the verification code</h2>
                <div className='flex w-full align-center justify-center'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        separator={<span></span>}
                        inputStyle={{
                            width: '40px',
                            height: '52px',
                            borderRadius: '12px',
                            border: '1px solid #D2D1CC',
                            fontSize: '20px',
                            textAlign: 'center',
                            margin: '0 6px',
                        }}
                    />
                </div>
                <div  className='flex-col mx-4 my-10 text-center text-[#2F2E36] text-[14px]'>
                    <Link to='/verification'>Resend verification code</Link>
                </div>
                <div className="flex-grow"></div>
                <div to='/tripRoute' className="text-[20px] text-black border border-[#777777] rounded-xl text-center py-2 font-medium mx-4 my-8 absolute bottom-0 left-0 right-0 px-10">Skip</div>
            </div>
            </>
        </MobileLayout>
    )
}

export default Verification;