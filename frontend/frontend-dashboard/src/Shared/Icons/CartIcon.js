import Icon from "./IconBase";
import { useNavigate } from "react-router-dom";

const CartIcon = (props) => {
  const navigate = useNavigate();

  return (
    <Icon
      width="21"
      height="14"
      viewBox="0 0 21 14"
      fill="none"
      onClick={() => navigate(-1)}
      {...props}
    >
      <path
        d="M17.5 2C17.5 0.9 16.6 0 15.5 0H12.5V2H15.5V4.65L12.02 9H8.5V4H4.5C2.29 4 0.5 5.79 0.5 8V11H2.5C2.5 12.66 3.84 14 5.5 14C7.16 14 8.5 12.66 8.5 11H12.98L17.5 5.35V2ZM2.5 9V8C2.5 6.9 3.4 6 4.5 6H6.5V9H2.5ZM5.5 12C4.95 12 4.5 11.55 4.5 11H6.5C6.5 11.55 6.05 12 5.5 12Z"
        fill="#706D64"
      />
      <path d="M8.5 1H3.5V3H8.5V1Z" fill="#706D64" />
      <path
        d="M17.5 8C15.84 8 14.5 9.34 14.5 11C14.5 12.66 15.84 14 17.5 14C19.16 14 20.5 12.66 20.5 11C20.5 9.34 19.16 8 17.5 8ZM17.5 12C16.95 12 16.5 11.55 16.5 11C16.5 10.45 16.95 10 17.5 10C18.05 10 18.5 10.45 18.5 11C18.5 11.55 18.05 12 17.5 12Z"
        fill="#706D64"
      />
    </Icon>
  );
};

export default CartIcon;
