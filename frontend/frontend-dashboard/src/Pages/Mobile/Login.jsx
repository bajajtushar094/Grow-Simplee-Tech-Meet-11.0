import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GSLogo from '../../Shared/Icons/GSLogo';

const Login = (props) => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit= (e) => {
        e.preventDefault();
        if(id === '123' && password === '123'){
            navigate('/createBag');
        }else{
            setError('Wrong Credentials!');
        }
        
        
    }

    
    return (
        <div className='flex flex-col h-screen items-center bg-[#F8F8F7]'>
            <div className='flex-row w-full justify-center bg-white px-4 py-5 items-center border-b border-[#D2D1CC]'>
                <h4 className='text-sm text-gs-text-gray font-semibold text-center'>Login</h4>
            </div>
            <div className='p-4'>
                <GSLogo/>
            </div>
            <form className='flex-col relative mx-4' onSubmit={e => {handleSubmit(e)}}>
                <input 
                    onChange={e => {setId(e.target.value)}}
                    value={id}
                    name='id' type='text' placeholder='Employee ID / Contact Number' className='text-[12px] text-[#777777] w-full border border-solid border-[#D2D1CC] rounded-full px-5 py-[14px] mt-5 mb-3'/>
                <input 
                    onChange={e => {setPassword(e.target.value)}}
                    value={password}
                    name='password' type='password' placeholder='Password' className='text-[12px] text-[#777777] w-full border border-solid border-[#D2D1CC] rounded-full px-5 py-[14px] mb-3'/>
                <button type='submit' className='text-[16px] font-semibold text-white w-full bg-[#2F2E36] rounded-full p-3 mb-3 mt-16'>Login</button>
            </form>
            <div className='text-[12px] text-[#2F2E36] text-center w-full p-1'><Link to='/login'>Forgot Password?</Link></div>
            <div className='text-center w-full py-6 text-[#aa0000] px-4 font-medium text-[14px]'>{error}</div>
            
        </div>
    )
}

export default Login;