import { useState, useEffect } from 'react'
import './Oven.scss'
import oven from './../../../assets/items/oven.png'
import useGameStore from '../../../GameStore';

function Oven(){
  const { hasOven } = useGameStore()

  return (
      <div className={`oven craft-item ${hasOven? "active" : "inactive"}`}>
        <img className="oven-img" src={oven}></img>
      </div>
  );
}

export default Oven
