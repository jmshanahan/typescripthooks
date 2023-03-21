import React, { FormEvent, useState, FC, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

enum EmailActionType {
  "USER_INPUT",
  "INPUT_BLUR",
}

interface IEmailState {
  value: string;
  isValid: boolean;
}
interface INewState {
  type: EmailActionType;
  val: string | null;
}

const InitialState: IEmailState = {
  value: "",
  isValid: false,
};

const emailReducer = (state: IEmailState, action: INewState): IEmailState => {
  switch (action.type) {
    case EmailActionType.USER_INPUT:
      return { value: action.val!, isValid: action.val!.includes("@") };

    case EmailActionType.INPUT_BLUR:
      return { value: state.value, isValid: state.value.includes("@") };

    default:
      return state;
  }
};

export type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};
const Login: FC<LoginProps> = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, InitialState);

  // useEffect(() => {
  //   const timerHandler = window.setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     window.clearTimeout(timerHandler);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${event.target.value}`);
    dispatchEmail({
      type: EmailActionType.USER_INPUT,
      val: event.target.value,
    });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(emailState.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: EmailActionType.INPUT_BLUR, val: null });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("submit handler");
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
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
