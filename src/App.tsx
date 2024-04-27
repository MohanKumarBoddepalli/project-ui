import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Login from "./publicLayout/Login";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";

import "./App.css";
import { useEffect, useState } from "react";
import { HttpService } from "./common/requestHandler";
import { useDispatch, useSelector } from "react-redux";
import { userId } from "./redux/sliceValues";
import { setUserId } from "./redux/slice/userSlice";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userUid = useSelector(userId);
  const dispatchUserId = useDispatch();

  const handleLogin = (res: any) => {
    if (res) {
      setIsAuthenticated(userUid ? true : false);
      window.location.hash = "#/test";
    }
  };

  useEffect(() => {
    if (!userUid) {
      dispatchUserId(setUserId(2));
    }
    HttpService.get("/checkAuthentication").then((res) => {
      if( res?.authenticated){
        setIsAuthenticated(true);
        window.location.hash = "#/test";
      } else {
        setIsAuthenticated(false);
        window.location.hash = '#/login';
      }
    });
  }, [isAuthenticated]);

  return (
    <HashRouter>
      {isAuthenticated ? (
        <UserRoutes isAuthenticated={isAuthenticated} />
      ) : (
        <AuthRoutes onLogin={handleLogin} isAuthenticated={isAuthenticated} />
      )}
    </HashRouter>
  );
}

export default App;
