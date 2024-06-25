import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import Main from './main';
import './admin.css';

function Dashboard() {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
