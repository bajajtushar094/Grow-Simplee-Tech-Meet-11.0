import Icon from "./IconBase";
import cx from "classnames";
import { useLocation } from "react-router-dom";

const PlayListAddCheckIcon = (props) => {
  const location = useLocation();
  return (
    <Icon
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      className={cx("text-[#000000]", {
        "text-[#B3261E]": location.pathname === "/vol",
        //   "bg-[#706D64]": params.row.status === "Out for delivery",
      })}
      {...props}
    >
      <g filter="url(#filter0_d_160_23187)">
        <path
          d="M22 9V20H6V8H10.05L11.88 6H17V4H11L9.17 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H22C23.1 22 24 21.1 24 20V9H22ZM22.67 7.99H24C23.99 4.68 21.31 2 18 2V3.33C20.58 3.33 22.66 5.41 22.67 7.99ZM20 7.99H21.33C21.32 6.15 19.84 4.67 18 4.67V6C19.11 6 19.99 6.89 20 7.99ZM9 14C9 16.76 11.24 19 14 19C16.76 19 19 16.76 19 14C19 11.24 16.76 9 14 9C11.24 9 9 11.24 9 14ZM17 14C17 15.65 15.65 17 14 17C12.35 17 11 15.65 11 14C11 12.35 12.35 11 14 11C15.65 11 17 12.34 17 14Z"
          fill="#3544B6"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_160_23187"
          x="-2"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_160_23187"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_160_23187"
            result="shape"
          />
        </filter>
      </defs>
    </Icon>
  );
};

export default PlayListAddCheckIcon;
