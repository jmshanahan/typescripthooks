import React, { FC, useState, ReactNode, useEffect } from "react";

const initialContext = {
  isLoggedIn: false,
  onLogout: (): void => {},
  onLogin: (email: string, password: string): void => {},
};

interface IProvider {
  children: ReactNode;
}

export const AuthContextProvider: FC<IProvider> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedInSet = localStorage.getItem("isLoggedIn");
    if (isLoggedInSet === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");

    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthContext = React.createContext(initialContext);

export default AuthContext;
