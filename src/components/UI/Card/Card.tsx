import React, { FC, ReactNode } from "react";

import classes from "./Card.module.css";

interface Props {
  children: ReactNode;
  className: string;
}

const Card: FC<Props> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
