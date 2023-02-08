import Icon from "./IconBase";
import { useNavigate } from "react-router-dom";

const LayoutIcon = (props) => {
  const navigate = useNavigate();

  return (
    <Icon
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      onClick={() => navigate(-1)}
      {...props}
    >
      <path
        d="M16.5 0H2.5C1.4 0 0.5 0.9 0.5 2V16C0.5 17.1 1.4 18 2.5 18H16.5C17.6 18 18.5 17.1 18.5 16V2C18.5 0.9 17.6 0 16.5 0ZM2.5 16V2H8.5V16H2.5ZM16.5 16H10.5V9H16.5V16ZM16.5 7H10.5V2H16.5V7Z"
        fill="#706D64"
      />
    </Icon>
  );
};

export default LayoutIcon;
