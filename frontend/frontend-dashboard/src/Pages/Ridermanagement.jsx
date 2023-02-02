import React from 'react'
import MapBox from '../Component/Global/MapBox'
import Layout from '../Component/Layout'
import scooter from './scooter.svg'
import Icon from './Icon.svg'
import Icon2 from './Icon2.svg'
import plus from './plus.svg'
import minus from './minus.svg'
import SideProfile from '../Component/Global/SideProfile'
import Box from '../Component/Global/Box.svg'


function Ridermanagement() {
  return (
      <Layout>
        <>
          <div className="w-full  px-5" id='mapbox_div' >
             <MapBox/>
            </div> 
          <div style={{position :'absolute', marginLeft:'1050px'}}>
             {/* <SideProfile borderRadius='10px'/> */}
          </div>

          <div style={{position:'absolute',display:'flex', flexDirection:'row', backgroundColor:'white', width:'893px', height:'86px', justifyContent:'space-between',padding:'10px', borderRadius:"12px",marginTop:'500px', marginLeft:'370px'}}>
             <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                 <img src={scooter} alt="" />
                 <div style={{display:'flex', flexDirection:'column'}}>
                     <p style={{fontWeight:'600'}}>16</p>
                     <p style={{fontSize:'12px'}}>Riders Dispatched</p>
                 </div>
             </div>

             <div  style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                  <img src={Box} alt="" />
                  <div  style={{display:'flex', flexDirection:'column'}}>
                     <p style={{fontWeight:'600'}}>52%</p>
                     <p style={{fontSize:'12px'}}>Delivered</p>
                 </div>
             </div>

             <div  style={{display:'flex', flexDirection:'row',alignItems:"center",}}>
                 <img src={Icon} alt="" />
                 <div  style={{display:'flex', flexDirection:'column'}}>
                     <p style={{fontWeight:'600'}}>14</p>
                     <p style={{fontSize:'12px'}}>On Route</p>
                 </div>
             </div>
             <div  style={{display:'flex', flexDirection:'row',alignItems:"center"}}>
                 <img src={Icon2} alt="" />
                 <div  style={{display:'flex', flexDirection:'column'}}>
                     <p style={{fontWeight:'600', color:'red'}}>2</p>
                     <p style={{fontSize:'12px'}}>Not on route</p>
                 </div>
             </div>
          </div>
           <div style={{display:'flex', flexDirection:'column',marginTop:'474px', position:'absolute', marginLeft:'1300px'}}>
               <div style={{backgroundColor:'white', width:'40px', height:'40px', display:'flex', alignItems:"center", justifyContent:'center', margin:"10px", borderRadius:'10px'}}>
                  <img src={plus} alt="" />
               </div>
               <div style={{backgroundColor:'white', width:'40px', height:'40px', display:'flex', alignItems:"center", justifyContent:'center', margin:"10px", borderRadius:"10px"}}>
                  <img src={minus} alt="" />
               </div>
           </div>
           </>
      </Layout>
  )
}

export default Ridermanagement