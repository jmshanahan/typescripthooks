import React, {
  FormEvent,
  useState,
  FC,
  useEffect,
  useReducer,
  useContext,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

enum ActionType {
  "USER_INPUT",
  "INPUT_BLUR",
  "PASSWORD_USER_INPUT",
  "PASSWORD_INPUT_BLUR",
}

interface IEmailState {
  value: string;
  isValid: boolean;
}
interface INewState {
  type: ActionType;
  val: string | null;
}

const InitialEmailState: IEmailState = {
  value: "",
  isValid: false,
};

const emailReducer = (state: IEmailState, action: INewState): IEmailState => {
  switch (action.type) {
    case ActionType.USER_INPUT:
      return { value: action.val!, isValid: action.val!.includes("@") };

    case ActionType.INPUT_BLUR:
      return { value: state.value, isValid: state.value.includes("@") };

    default:
      return state;
  }
};
interface IPasswordState {
  value: string;
  isValid: boolean;
}
const InitialPasswordState: IPasswordState = {
  value: "",
  isValid: false,
};

const passwordReducer = (
  state: IPasswordState,
  action: INewState
): IPasswordState => {
  switch (action.type) {
    case ActionType.PASSWORD_USER_INPUT:
      return { value: action.val!, isValid: action.val!.length > 6 };

    case ActionType.PASSWORD_INPUT_BLUR:
      return { value: state.value, isValid: state.value.length > 6 };

    default:
      return state;
  }
};

export type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};
const Login: FC = () => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    InitialEmailState
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    InitialPasswordState
  );
  const ctx = useContext(AuthContext);
  useEffect(() => {
    const timerHandler = window.setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );
    }, 500);
    return () => {
      window.clearTimeout(timerHandler);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`${event.target.value}`);
    dispatchEmail({
      type: ActionType.USER_INPUT,
      val: value,
    });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({
      type: ActionType.PASSWORD_USER_INPUT,
      val: value,
    });
    // setEnteredPassword(event.target.value);

    // setFormIsValid(passwordState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: ActionType.INPUT_BLUR, val: null });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: ActionType.PASSWORD_INPUT_BLUR,
      val: null,
    });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("submit handler");
    ctx.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
