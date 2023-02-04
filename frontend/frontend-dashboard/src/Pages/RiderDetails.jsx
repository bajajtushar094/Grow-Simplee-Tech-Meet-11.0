import {React, useEffect, useState} from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";

const RiderDetails = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    //const riderId = location.state.id;

    const [orders, setOrders] = useState([]);

    const riderId = '65';

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:8000/core/orders/rider/"+riderId);
        const data = await response.json();
        console.log(data);
        return setOrders(data.riders);
    }

    useEffect(() => {
        fetchData();
      },[])


    return (
        <div className="flex flex-col h-screen items-center bg-[#F8F8F7]"></div>
    )
}

export default RiderDetails;
