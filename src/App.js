import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Pages/Home.js";
import { Analytics } from "./Pages/Analytics.js";
import { Register } from "./Pages/Register.js";
import { LoginPage } from "./Pages/LoginPage.js";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  
  const [newEvent, setNewEvent] = useState({activity: '', start: '', end: '', length: 0});
  const [allEvents, setAllEvents] = useState([]);

  // check auth before every page load, unless location is /login or /register
  const location = useLocation();
  const checkAuth = async () => {
    if (location.pathname === '/register' || location.pathname === '/Register' || location.pathname === '/login' || location.pathname === '/Login'){
      return;
    }
    console.log('You are checking auth!');
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    try {
      await fetch('/api/auth', requestOptions)
        .then((res) => handleAuth(res))
    } catch (err) {
      console.log(err);
    }
  }

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleAuth = (res) => {
      if (res.status === 401) {
        console.log('RENAVIGATING TO LOGIN');
        navigate('/Login')
        return;
      }
      console.log(`isLoading is: ${isLoading}`);
      setIsLoading(false);
      console.log(`isLoading is: ${isLoading}`);
  }

  // Get allEvents on pageload
  const handleAddAllEvents = (res) => {
    console.log('reached handleallevents!');
    const userAllEvents = res.allEvents;
    // add all events from database to state on page load
    setAllEvents(
      allEvents.concat(userAllEvents)
    );
  }

  const getAllEvents = async () => {
    console.log('You are loading GET allEvents!');
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  }
  try {
    console.log('You are fetching GET allEvents!');
    await fetch('/api/allEvents', requestOptions)
      .then(res => res.json())
      .then(res => handleAddAllEvents(res));
  } catch (err) {
    console.log('You hit all events error!');
    console.log(err);
    }
  }

  useEffect(() => {
    checkAuth();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAllEvents();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // IS LOADING CAN BE MOVED TO HOME AND ANALYTICS PAGE?

  return (
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/Login" element={ <LoginPage setIsLoading={setIsLoading} /> } />
        <Route path="/Register" element={ <Register /> } />
        <Route path="/Home" element={
          <Home 
            newEvent={newEvent} setNewEvent={setNewEvent}
            allEvents={allEvents} setAllEvents={setAllEvents} /> } />
        <Route path="/Analytics" element={
          <Analytics 
            allEvents={allEvents}
            setAllEvents={setAllEvents} />
        } />
      </Routes>
    );
};

export default App;
