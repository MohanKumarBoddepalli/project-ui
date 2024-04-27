import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../modules/layout/MainLayout";

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Navigate replace to="/test" />} />
      <Route path="/test" element={<MainLayout />}>
        <Route path="1" element={<MainLayout />} /> // Define the nested route
      </Route>
    </Routes>
  );
};

export default ChatRoutes;
