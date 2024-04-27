import {
  Routes,
  Route,
  HashRouter,
  Router,
  redirect,
  Navigate,
} from "react-router-dom";
import Login from "../publicLayout/Login";
import Register from "../publicLayout/Register";
import Chat from "../modules/chat/Chat";

type Color = boolean | null;

interface IProps {
  onLogin: any;
  isAuthenticated: boolean;
}

const AuthRoutes = ({ onLogin, isAuthenticated }: IProps) => {
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={onLogin} />}>
        <Route path="login" element={<Login onLogin={onLogin} />} />
      </Route>
      <Route path="/register" element={<Register />} />
      {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
    </Routes>
  );
};

export default AuthRoutes;
