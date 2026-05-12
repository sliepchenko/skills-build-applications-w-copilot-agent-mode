import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-octofit shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit Logo"
                height="36"
                className="d-inline-block align-top rounded"
              />
              <span className="fw-bold">OctoFit Tracker</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')} to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')} to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')} to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')} to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')} to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid py-4 main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center hero-section py-5">
                  <img src="/octofitapp-small.png" alt="OctoFit Logo" className="hero-logo mb-4" />
                  <h1 className="display-4 fw-bold text-primary">Welcome to OctoFit Tracker</h1>
                  <p className="lead text-secondary mt-3">
                    Track your fitness activities, join teams, and compete on the leaderboard!
                  </p>
                  <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                    <NavLink to="/users" className="btn btn-primary btn-lg">Users</NavLink>
                    <NavLink to="/teams" className="btn btn-secondary btn-lg">Teams</NavLink>
                    <NavLink to="/activities" className="btn btn-success btn-lg">Activities</NavLink>
                    <NavLink to="/leaderboard" className="btn btn-warning btn-lg text-dark">Leaderboard</NavLink>
                    <NavLink to="/workouts" className="btn btn-info btn-lg text-dark">Workouts</NavLink>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <footer className="footer-octofit text-center py-3 mt-auto">
          <small>&copy; {new Date().getFullYear()} OctoFit Tracker. Built with React &amp; Bootstrap.</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
