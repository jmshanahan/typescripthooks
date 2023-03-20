import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

// import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";

// import classes from "./Button.module.css";
// interface Props {
//   disabled: boolean;
//   onLogin: (username: string, password: string) => void;
//   type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
//   className: string;
//   children?: ReactNode;
// }

// const Button: FC<Props> = (props) => {
//   const buttonClickHandler = () => {
//     //props.onLogin(props.)
//   };
//   return (
//     <button
//       type={props.type || "button"}
//       className={`${classes.button} ${props.className}`}
//       onClick={buttonClickHandler}
//       disabled={props.disabled}
//     >
//       {props.children}
//     </button>
//   );
// };

// export default Button;
