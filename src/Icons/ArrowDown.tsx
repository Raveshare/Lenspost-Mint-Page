import * as React from "react";
import { SVGProps } from "react";

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.9295 17.5386C17.6686 16.1387 19.2198 14.5075 20.5427 12.6877C20.7055 12.4666 20.7929 12.1883 20.7705 11.893C20.7206 11.2383 20.1496 10.748 19.4949 10.7978C16.3894 11.0341 13.2705 11.0341 10.165 10.7978C9.51038 10.748 8.93929 11.2383 8.88947 11.893C8.867 12.1883 8.95443 12.4666 9.11728 12.6877C10.4402 14.5075 11.9914 16.1387 13.7304 17.5386C14.374 18.0566 15.286 18.0566 15.9295 17.5386Z"
      fill={props.color}
    />
  </svg>
);

export default ArrowDown;
