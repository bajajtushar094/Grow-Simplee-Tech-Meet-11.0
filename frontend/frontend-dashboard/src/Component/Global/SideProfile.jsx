import React from 'react'
import Avatar from '@mui/material/Avatar'
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import vector from './Vector.svg'
import line from './line.svg'
import arrow from './arrow.svg'
import dot from './Dot.svg'

function SideProfile(props) {
  return (
    <div style={{backgroundColor:'white', height:'900px',width:'464px', padding:'20px'}}>
        <div style={{display:props.display?props.display:'flex', flexDirection:' row' , alignItems:'center',justifyContent:'center', margin:'5px'}}>
         {/* toplogo */}
            < CloseIcon sx={{fontSize:'medium'}}/>
            Close
         </div>
    
         <div>
            {/* profilePic */}
            <Avatar />
         </div>
         <div style={{}}>
            {/* name */}
            <p style={{fontWeight:'600', fontSize:'23px'}}> pranav jain</p>
           
         </div>

         <div style={{display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center', width:'93px',height:'28px',backgroundColor:props.backgroundColor?props.backgroundColor:'#12B76A',borderRadius:'16px',marginTop:'18px'}}>
            <img style={{height:'8px',margin:'5px'}} src={dot} alt="" />
            <p style={{fontSize:'14px'}}>{props.ontime?'ontime':'delay'}</p>
         </div>
         <div style={{marginTop:'20px', fontSize:'17px'}}>
            {/* status  ontime and status*/}
            Rider Status
         </div>
         <div style={{display:'flex', flexDiretion:'row', justifyContent:'flex-start', marginTop:'30px', padding:'16px', alignItems:'center'}}>
              <div style={{display:'flex',flexDirection:'row', alignItems:'center', marginRight:'25px'}}>
                <ShoppingBagOutlinedIcon sx={{fontSize:'large', margin:'10px'}}/>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'14px'}}>Bag Level</p>
                    <p style={{fontSize:'10px', fontWeight:'bold'}}> 34%</p>

                </div>
            {/* bag */}
              </div>
              <div  style={{display:'flex',flexDirection:'row', alignItems:'center' ,justifyContent:'flex-start'}}>
                 <AccessTimeIcon  sx={{fontSize:'large', margin:'10px'}}/>
                 <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'14px'}}>ETF</p>
                    <p style={{fontSize:'10px', fontWeight:'bold'}}>23 mins</p>

                 </div>
            {/* time */}
              </div>
         </div>
         <div>
            <p style={{fontWeight:'bold'}}>Upcoming Delivery</p>
         </div>
         <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', padding:'16px', alignItems:'center',marginTop:'20px'}}>
            {/* delivery status */}
            <div style={{display:'flex', flexDirection:'row',width:'185px', height:'44px', alignItems:'center', justifyContent:'flex-start'}}>
                <img style={{height:'35',marginRight:'20px'}} src={vector} alt="" />

                <div style={{display:'flex', flexDirection:'column'}}>
                  <p style={{fontSize:'13px'}}>AWB ID</p>
                  <p style={{fontSize:'13px'}}>Order ID</p>
                </div>
            </div>
            <div style={{width:'97px', height:'28px',backgroundColor:' #EDECE9', borderRadius:'16px', textAlign:'center'}}>
                <p style={{fontSize:'14px', fontWeight:'500',textAlign:'center',marginTop:'3px'}}>ETA : 8 mins</p> 
            </div>

         </div>
         <div>
            <img src={line} alt="" />
         </div>

         <div style={{display:'flex', flexDirection:'column',padding:'16px'}}>
            {/* imformation */}
            <div style={{width:'64px',height:'20px',backgroundColor:'#FAEDC2',borderRadius:'16px',borderColor:'#DFAC03',marginTop:'16px'}}>
              <p style={{fontSize:'12px',textAlign:'center',}}>Dropoff</p>
            </div>
            <div style={{display:'flex', flexDirection:'Column',justifyContent:'center',marginTop:'20px'}}>
               <p style={{fontSize:'14px'}}>Name</p>
               <p style={{fontWeight:'bold',fontSize:'16px'}}>Aman Bucha</p>
            </div>

            <div style={{display:'flex', flexDirection:'Column',justifyContent:'center',marginTop:'12px'}}>
               <p style={{fontSize:'14px'}}>Adress</p>
               <p style={{fontWeight:'bold',fontSize:'16px'}}>IIT Guwahati</p>
            </div>

            <div style={{display:'flex',flexDirection:'row',marginTop:'12px',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'Column'}}>
                     <p style={{fontSize:'14px',fontFamily:'Inter',fontWeight:'500'}}>City</p>
                     <p style={{fontWeight:'bold',fontSize:'16px'}}>Kolkata</p>
                </div>
                <div style={{display:'flex',flexDirection:'Column'}}>
                     <p style={{fontSize:'14px'}}>Postal Code</p>
                     <p style={{fontWeight:'bold',fontSize:'16px'}}>726206</p>
                </div>
                <div style={{display:'flex',flexDirection:'Column'}}>
                    <p style={{fontSize:'14px'}}>Time</p>
                    <p style={{fontWeight:'bold',fontSize:'16px'}}>4:30 PM</p>
                </div>
            </div>
         </div>
         <div style={{display:props.display?props.display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:'432px', height:'44px', marginTop:'6px', backgroundColor:'#272520',}}>
            <p  style={{color:'white',margin:'8px'}}>Open Order List</p>
            <img style={{height:'14'}} src={arrow} alt="" />
         </div>
    </div>
  )
}

export default SideProfile