import { Route, Routes } from "react-router-dom";
import React from "react";
import Dashboard from "../components/Dashboard";
import StudentPage from "../components/StudentPage/StudentPage";

const AppRouters = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<StudentPage />} />
          <Route path="/Dashboard/sec/Admin" element={<Dashboard />} />
        </Routes>
    </div>
  );
};

export default AppRouters;
