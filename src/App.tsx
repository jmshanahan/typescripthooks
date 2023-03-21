import React, { useState, FC, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedInSet = localStorage.getItem("isLoggedIn");
    if (isLoggedInSet === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email: string, password: string) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log("isloggedin");
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = (): void => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home logout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
};

export default App;
