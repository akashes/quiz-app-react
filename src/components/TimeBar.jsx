import React, { useState, useEffect } from 'react';

const TimeBar = ({timerCompleted,resetTimer}) => {
    console.log(resetTimer)
  const [timeLeft, setTimeLeft] = useState(10); // Total time in seconds

  useEffect(() => {
    if (resetTimer) {
        setTimeLeft(10); // Reset the timer when resetTimer is true
        return;
      }
      if (timeLeft === 0) {
          timerCompleted()
          setTimeLeft(10)
          return;
          
        }
        
        

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [timeLeft,resetTimer]);

  const percentage = ((10 - timeLeft) / 10) * 100;

  return (
    <div className="time-bar-container">
      <div
        className="time-bar"
        style={{
          width: `${percentage}%`,
          transition: 'width 1s linear',
          backgroundColor: 'green',
          height: '20px',
          borderRadius:'20px'
        }}
      ></div>
      <p style={{textAlign:'center' , fontWeight:'normal', color:'gray'}}>      {timeLeft}
      </p>
    </div>
  );
};

export default TimeBar;
