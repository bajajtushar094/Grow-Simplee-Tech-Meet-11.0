import React, {useState} from 'react';
import axios from 'axios';
import Map from '../Component/Mobile/Map';
import arrow from '../Component/Global/arrow.svg';

function App() {

  const [file, setFile] = useState()
  const [data, setData] = useState([])

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }
  const coordinates = [
    {latitude: 26.189605193409417, longitude: 91.69294796870521, status:'delivery'},
    {latitude: 26.166979228463582, longitude: 91.75049812487305, status:'pickup'},
    //{latitude: 25.5119243264636, longitude: 92.73516653680502}
];

const [routeDetails, setRouteDetails] = React.useState({
    distance: 0,
    time_required: '',
    time_to_reach: ''
});

  return (
   <>  <div style={{display:'flex', flexDirection:'row',height:'100vw', padding:'100px'}}>
           <div style={{width:"100vw", height:'500px', margin:'40px'}}>
               <Map coordinates = {coordinates} setRouteDetails={setRouteDetails} data={data} className='flex-grow z-0'></Map>
          </div>
           <div className="App" style={{margin:"40px", display:"flex", flexDirection:"column", justifyContent:'space-between', height:'400px',backgroundColor:'white', padding:'30px', borderRadius:'5px'}}>
              <form onSubmit={handleSubmit}>
              <input  style={{margin:'20px'}} type="file" onChange={handleChange}/>
              <button style={{margin:'20px',backgroundColor:'black', width:"100px", height:'40px',borderRadius:'5px',color:"white"}} type="submit"><p style={{fontSize:'14px'}}>Upload</p></button>
              </form>

              <button style={{margin:'20px',backgroundColor:'black', width:"220px", height:'40px',borderRadius:'5px',color:'white', display:'flex', flexDirection:"row", justifyContent:"center",alignItems:'center'}} type="submit"><p style={{fontSize:'14px', marginRight:'5px'}}>Skip to first deliveries</p> <img src={arrow} alt="" /> </button>

              <button style={{margin:'20px',backgroundColor:'black', width:"220px", height:'40px',borderRadius:'5px',color:'white', display:'flex', flexDirection:"row", justifyContent:"center",alignItems:'center', }} type="submit"><p style={{fontSize:'14px',marginRight:'5px'}}>Dynamic Delivries</p> <img src={arrow} alt="" /></button>
       </div>

       </div> 
   </>
  );
}

export default App;