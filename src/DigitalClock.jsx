import React from 'react';
import {useState, useEffect} from 'react';
import './DigitalClock.css';


const DigitalClock = () => {

    const [time, setTime] = useState(new Date());
      useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    return (
        <div className='clock-container'>
            <div className="clock">
                <p>{time.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    })}
                </p>
            </div>
        </div>
    )   
}   
export default DigitalClock;