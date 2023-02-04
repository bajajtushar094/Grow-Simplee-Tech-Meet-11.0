import React from 'react'
import "./Mapmarker.css"
import Pins from '../../Mobile/Pins.svg'
import rider from './rider.svg'
function Mapmarker(props) {
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      
       <div style={{position:'absolute'}}>
           <img src={Pins} alt="" />
       </div>

       <div style={{marginLeft:"15px",marginTop:'10px', position:'absolute', height:'24px', width:'24px'}}>
            <img   src={props.image} alt="" />
       </div>
    </div>
  
  )
}

export default Mapmarker