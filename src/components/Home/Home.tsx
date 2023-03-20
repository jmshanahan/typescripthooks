import React, { FC } from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
interface Props {
  logout: () => void;
}
const Home: FC<Props> = ({ logout }) => {
  logout();
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
