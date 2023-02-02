import { borderColor } from '@mui/system'
import React from 'react'
import SideProfile from '../../Global/SideProfile'
import Topbar from '../TopBar'
import Layout from '../Layout'
import Table2 from '../../Global/Table2'
import { useState } from 'react'
import arrow from './arrow.svg'
import Open from './Open.svg'
import Drone from './Drone.svg'
import view from './view.svg'
import TV from './TV.svg'
import sus from './sus.svg'
import delivered from './Icon.svg'
import distance from './Icon.png'
import delay from './icon2.svg'
import {TOP_TABS} from '../../../constants/sidebarconst'

function DroneManagement() {


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

  const [isHover, setIsHover] = useState(false);
  const [overview,setOverview] = useState(true);
  const [delivery,setDelivery] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };

   const handleOverview = () => {
      setOverview(true);
      if(delivery){
         setDelivery(false);
      }
   }

   const handleDelivery = () => {
      setDelivery(true);
      if(overview){
         setOverview(false);
      }
   }

   


  return (
    <div>
         <Topbar
            topTabs={TOP_TABS}
            />
        
         <div style={{backgroundColor:'white'}}>
          <div style={{display:'flex', flexDirection:'row',padding:'16px', marginLeft:'16px', alignItems:'center'}}>
             <img src={arrow} alt="" />
             <p style={{fontSize:'12px',fontWeight:'600',color:'gray',margin:'5px'}}>Rider Management</p>
             <p style={{fontSize:'12px',fontWeight:'600',color:'gray',margin:'5px'}}>/</p>
             <p style={{fontSize:'12px',fontWeight:'600',color:'gray',margin:'5px'}}>Rider Details</p>
             <p style={{fontSize:'12px',fontWeight:'600',color:'gray',margin:'5px'}}>/</p>
             <p style={{fontSize:'12px',fontWeight:'600',color:'gray',margin:'5px'}}>Ranjeev Sharma</p>
          </div>

         <div style={{width:'100%', display:'flex', flexDirection:'row', marginTop:'45px'}}>
           <SideProfile display='none'/>
           <div style={{width:'1000px', borderRadius:'24px 0px 0px 0px', borderColor:'black',border:' 1px solid #EDECE9', padding:'16px', borderRight:'none',borderBottom:'none'}}>
              <div style={{display:'flex', flexDirection:'row'}}>
                 <p style={{margin:'12px', fontSize:'12px', color:overview?'blue':'#706D64',fontWeight:'600',opacity:'0.8',cursor:'pointer'}}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOverview}>Overview</p>
                 <p style={{margin:'12px',fontSize:'12px',color:delivery?'blue':'#706D64',fontWeight:'600',opacity:'0.8',cursor:'pointer'}} onClick={handleDelivery} >Deliveries</p>
              </div>
             { delivery && 
              <div>
              <div>
                 {/* deliveries */}
                 <p style={{margin:'5px',fontSize:'26px',fontWeight:'bold'}}>Deliveries</p>
              </div>
              <div>
                 {/* status para */}
                 <p style={{marginTop:'-10px',fontSize:'12px',fontWeight:'600',color:'#706D64',marginLeft:'5px',opacity:'0.8'}}> Get status of all theprevious and current deliveries</p>
                
              </div> 
              <div style={{padding:'16px'}}>
                 <div>
                      {/* table one */}
                      <div style={{display:'flex',flexDirection:'row',alignItems:"center"}}>
                         <p style={{margin:'5px',fontWeight:'600',color:'#5F5D59',fontSize:'14px'}}>Current</p>
                         <div style={{border:'2px solid #EDECE9', borderRadius:'4px', width:'24px',height:'24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <img src={Open} alt="" />
                         </div>
                     </div>
                      <Table2/>
                  </div>
                 <div>
                  {/* table two */}
                  <div style={{display:'flex',flexDirection:'row',alignItems:"center"}}>
                         <p style={{margin:'5px',fontWeight:'600',color:'#5F5D59',fontSize:'14px'}}>Upcoming</p>
                         <div style={{border:'2px solid #EDECE9', borderRadius:'4px', width:'24px',height:'24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <img src={Open} alt="" />
                         </div>
                     </div>
                      <Table2/>
                 </div>
                 <div>
                       {/* table three */}
                       <div style={{display:'flex',flexDirection:'row',alignItems:"center"}}>
                         <p style={{margin:'5px',fontWeight:'600',color:'#5F5D59',fontSize:'14px'}}>Completed</p>
                         <div style={{border:'2px solid #EDECE9', borderRadius:'4px', width:'24px',height:'24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <img src={Open} alt="" />
                         </div>
                     </div>
                      <Table2/>
                 </div>
              </div>
              </div>
              }
            
            { overview && 

            <div>
              
               <div>
                  {/* overview */}
                  <p style={{margin:'5px',fontSize:'26px',fontWeight:'bold'}}>Overview</p>
               </div>
               <div>
                  {/* status para */}
                  <p style={{marginTop:'-10px',fontSize:'12px',fontWeight:'600',color:'#706D64',marginLeft:'5px',opacity:'0.8'}}> Get status of all theprevious and current deliveries</p>
               </div>

               <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:"20px"}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                      <img src={delivered} alt="" />
                      <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> Order Delivered</p>
                      </div>
                      
                    </div>

                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                      
                       <img style={{height:'40px'}} src={distance} alt="" />
                       <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> distance Covered</p>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'row'}}>
                       
                       <img src={delay} alt="" />
                       <div style={{display:'flex', flexDirection:'column',margin:'10px'}}>
                         <p style={{fontSize:'24px', fontWeight:'bold', color:'red'}}> 20000</p>
                         <p style={{fontSize:'12px', fontWeight:'600', color:'gray'}}> packages Delayed</p>
                      </div>
                    </div>
              </div>
               <div style={{display:'flex', flecDirection:'row', marginTop:'20px',padding:"8px"}}>
                   <div>
                     {/* two first divs */}
                        <div style={{display:'flex', flexDirection:'column', width:'388px', height:'128px', border:'1px solid #EDECE9', borderRadius:'8px', padding:'20px'}}>
                           <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                               <img style={{height:'15px'}} src={Drone} alt="" />
                               <p  style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Drone Type</p>
                           </div>
                           <p style={{marginTop:'15px',fontWeight:'bold',fontSize:'16px'}}> Drone Type</p>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', width:'388px', height:'128px', border:'1px solid #EDECE9', borderRadius:'8px',padding:'20px',marginTop:'10px'}}>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <img style={{height:'15px'}} src={sus} alt="" />
                                <p style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Order Size Support</p>
                            </div>
                            <p style={{marginTop:'15px',fontWeight:'bold',fontSize:'16px'}}>Medium / Small</p>
                        </div>
                   </div>

                   <div style={{display:'flex', flexDirection:'column', width:"592px", height:'417px', border:'1px solid #EDECE9', borderRadius:'8px',padding:'20px', marginLeft:'10px'}}>
                     {/* drone view */}
                        <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                           <img style={{height:'15px'}} src={TV} alt="" />
                           <p style={{fontSize:'12px', fontWeight:'600',margin:'5px'}}>Live Feed</p>
                        </div>
                        <div>
                          <img style={{marginLeft:'-10px',marginTop:'10px'}} src={view} alt="" />
                        </div>
                   </div>
               </div>

             </div>}







           </div>
        </div>

        </div>
      
        </div> 
  )
}

export default DroneManagement