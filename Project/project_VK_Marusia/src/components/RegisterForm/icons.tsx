import React from 'react';

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
  
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <rect
      id="icon"
      width="24"
      height="24"
      x="0"
      y="0"
      // fill="rgb(255,255,255)"
      fillOpacity="0"
    />
    <path
      id="Vector"
      d="M21 3C21.5523 3 22 3.44772 22 4L22 20.0066C22 20.5552 21.5447 21 21.0082 21L2.9918 21C2.44405 21 2 20.5551 2 20.0066L2 19L20 19L20 7.3L12 14.5L2 5.5L2 4C2 3.44772 2.44772 3 3 3L21 3ZM8 15L8 17L0 17L0 15L8 15ZM5 10L5 12L0 12L0 10L5 10ZM19.5659 5L4.43414 5L12 11.8093L19.5659 5Z"
      fill={props.fill || "rgb(0,0,0)"}
      fillRule="nonzero"
    />
  </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
   
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <rect
      id="icon"
      width="24"
      height="24"
      x="0"
      y="0"
      fill="rgb(255,255,255)"
      fillOpacity="0"
    />
    <path
      id="Vector"
      d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22L18 22C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22L4 22ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
    fill={props.fill || "rgb(0,0,0)"}
      fillOpacity="0.400000006"
      fillRule="nonzero"
    />
  </svg>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
   
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <rect
      id="icon"
      width="24"
      height="24"
      x="0"
      y="0"
      fill="rgb(255,255,255)"
      fillOpacity="0"
    />
    <path
      id="Vector"
      d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11L23 11L23 13L21 13L21 17L19 17L19 13L17 13L17 17L15 17L15 13L12.917 13ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
     fill={props.fill || "rgb(0,0,0)"}
      fillRule="nonzero"
    />
  </svg>
);