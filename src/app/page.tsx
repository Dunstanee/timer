"use client";
import React, { useEffect, useRef, useState } from "react";
// import css from public
import "./globals.css";

export default function Home() {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
   interval.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      
    } else {
      if (interval.current) {
        window.clearInterval(interval.current);
      }
    }
  }, [isRunning]);
 
  const handleStart = () => {
    console.log("start");
    setIsRunning(true);
  };
  const handleStop = () => {
    console.log("stop");
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime(0);
  };

  return (
   <div className="content d-flex align-items-center justify-content-center h-100">
    <div className="card col-xxl-4">
      <div className="card-body">
        <h1 className="card-title">{time}</h1>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <button type="button"  onClick={handleStop} className="btn btn-sm btn-outline-danger me-3">Stop</button>
          <button type="button" onClick={handleStart} className="btn btn-sm btn-success">Start</button>
        </div>
      </div>
    </div>
    
   </div>
  );
}
