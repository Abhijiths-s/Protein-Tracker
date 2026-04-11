import { useState } from 'react'
import {BrowserRouter, Routes ,Route }from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserSetup from './pages/UserSetup';
import ProtectedRoute from "./components/ProtectedRoute";
import Logs from './pages/Logs';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/usersetup" element={<UserSetup/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
        </ProtectedRoute>} />
        <Route path="/logs" element={
          <ProtectedRoute>
            <Logs/>
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
