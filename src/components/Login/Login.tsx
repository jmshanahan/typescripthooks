import React, { FormEvent, useState, FC, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { setTimeout } from "timers/promises";

export type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};
const Login: FC<LoginProps> = (props) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    const timerHandler = window.setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      window.clearTimeout(timerHandler);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("submit handler");
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" disabled={!formIsValid} className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

// disabled: boolean;
// onClick: () => void;
// type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
// children: ReactNode;
// className: string;
export default Login;
