import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./global/Header";
import { Sidebar } from "./global/Sidebar";
import { Topbar } from "./global/Topbar";

export const Dashboard = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      console.log("yoooooo");
    }
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};
