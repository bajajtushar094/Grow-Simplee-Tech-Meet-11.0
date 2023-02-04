import React from 'react'
import "./Mapmarker.css"
import Pins from '../../Mobile/Pins.svg'
import rider from './rider.svg'
function Mapmarker(props) {
  return (
    <div style={{display:"flex", flexDirection:"row",height:'50px',width:"80px"}}>
      
       <div style={{position:'absolute'}}>
           <img src={Pins} alt="" />
       </div>

       <div style={{marginLeft:"15px",marginTop:'10px', position:'absolute', height:'24px', width:'24px'}}>
            <img   src={props.image} alt="" />
       </div>
       <div style={{backgroundColor:'#3CB371',height:"18px",width:'35px',marginLeft:"35px",zIndex:'99',borderRadius:"8px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <p style={{color:'white', fontSize:'10px'}}>17%</p>
       </div>
    </div>
  
  )
}

export default Mapmarker