import { useState, useEffect } from 'react';
import './CountDown.scss';
import countdown from './../../../assets/countdown.png';
import useCountDown from './Store'

function CountDown({setSaveWarningMenu}){
  const { count, decrement, reset } = useCountDown()
  let timeout = {}

  useEffect(() => {
    clearInterval(timeout);
    timeout = setInterval(() => {
      decrement()
    }, 1000);
  }, []);

  useEffect(() => {
    if(count === 300 || count === 120 || count === 60 || count === 0){
      setSaveWarningMenu(true)
      if(count === 0) {
        window.location.reload(false);
      }
    }
  }, [count])

  return (
    <div className="countdown">
      <img className="countdown-img" src={countdown}></img>
      <span className="countdown-text countdown-minute">{Math.floor(count/60) <10? `0${Math.floor(count/60)}`:Math.floor(count/60)}</span>
      <span className="countdown-text countdown-second">{count%60 < 10? `0${count%60}`: count%60}</span>
    </div>
  );
}

export default CountDown;
