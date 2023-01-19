import React from 'react'
import Avatar from '@mui/material/Avatar'
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

function SideProfile() {
  return (
    <div style={{backgroundColor:'white', height:'900px',width:'464px', padding:'15px'}}>
        <div style={{display:'flex', flexDirection:' row' , alignItems:'center',justifyContent:'center', margin:'5px'}}>
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
         <div style={{marginTop:'10px', fontSize:'17px'}}>
            {/* status  ontime and status*/}
            Rider Status
         </div>
         <div style={{display:'flex', flexDiretion:'row', justifyContent:'space-evenly', marginTop:'40px', padding:'16px', alignItems:'center'}}>
              <div style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
                <ShoppingBagOutlinedIcon sx={{fontSize:'medium', margin:'10px'}}/>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'10px'}}>Bag Level</p>
                    <p style={{fontSize:'10px', fontWeight:'bold'}}> 34%</p>

                </div>
            {/* bag */}
              </div>
              <div  style={{display:'flex',flexDirection:'row', alignItems:'center' ,justifyContent:'flex-start'}}>
                <AccessTimeIcon  sx={{fontSize:'medium', margin:'10px'}}/>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'10px'}}>ETF</p>
                    <p style={{fontSize:'10px', fontWeight:'bold'}}>23 mins</p>

                </div>
            {/* time */}
              </div>
         </div>
         <div>
            <p>Upcoming Delivery</p>
         </div>
         <div>
            {/* delivery status */}
         </div>

         <div>
            {/* imformation */}
         </div>
    </div>
  )
}

export default SideProfile