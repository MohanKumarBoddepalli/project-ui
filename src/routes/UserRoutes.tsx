import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import ChatRoutes from "./ChatRoutes";
import Chat from "../modules/chat/Chat";
import { Hash } from "crypto";

const UserRoutes = (isAuthenticated: any) => {
  if (!isAuthenticated) {
    window.location.hash = "#/login";
  }
  return <ChatRoutes />;
};

export default UserRoutes;
