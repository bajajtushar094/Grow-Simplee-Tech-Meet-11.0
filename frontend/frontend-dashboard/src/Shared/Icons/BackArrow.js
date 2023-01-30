import Icon from "./IconBase";
import { useNavigate } from 'react-router-dom';


const BackArrowIcon = (props) => {
  const navigate = useNavigate();
  
  return (


  <Icon width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => navigate(-1)}  {...props}>
<path d="M18.75 11.624H5" stroke="#2F2E36" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.625 6L5 11.625L10.625 17.25" stroke="#2F2E36" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>)
};

export default BackArrowIcon;
