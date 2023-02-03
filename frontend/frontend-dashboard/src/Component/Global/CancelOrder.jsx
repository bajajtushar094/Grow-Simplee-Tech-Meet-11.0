import React from 'react'
import arrow from './arrow.svg'
function CancelOrder() {
  return (
    <div>
       <div style={{position:'absolute',padding:"100px", backgroundColor:"white", height:'626px', width:'616px', display:"flex", flexDirection:'column', zIndex:'100', }}>
              <div>
                 <p style={{fontWeight:'700', fontSize:'48px'}}>Dynamic Pickups</p>
              </div>
              <div style={{display:'flex', flexDirection:'column', marginTop:"40px"}}>
                   <p style={{fontWeight:'600'}}>AWB Number </p>
                    <input style={{marginLeft:'25px', fontSize:'14px', margin:"10px"}} type="text" placeholder='Enter location as string'/>
                
              </div>
              <div style={{display:'flex', flexDirection:'column', marginTop:"40px"}}>
                    <div>
                         <p style={{fontWeight:'600', color:'gray', opacity:'0.7'}}>Cancel multiple rders </p>
                         <img style={{color:'red'}} src={arrow} alt="" />
                    </div>
                    <input style={{marginLeft:'25px', fontSize:'14px', margin:"10px"}} type="text" placeholder='Enter location as string'/>
                
              </div>



              <div style={{height:"44px",width:'416px', backgroundColor:'black', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:"50px",borderRadius:'8px'}}>
                 <p style={{color:"white", fontSize:"12px"}}>Add Locations</p>
                 <img style={{height:"12px", marginLeft:'10px'}} src={arrow} alt="" />
              </div>
          </div>
    </div>
  )
}

export default CancelOrder
