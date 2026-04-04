import { useState,useEffect } from "react";
export default function Dashboard() {

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
}, []);

  return (
    <div className="text-black bg-primgreen min-h-screen flex items-center justify-center p-6">
      <h1 className="text-2xl">Welcome to Dashboard</h1>
    </div>
  );
}