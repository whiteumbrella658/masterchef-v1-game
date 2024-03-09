import { useState, useEffect } from 'react'
import './Ladle.scss'
import ladle from './../../../assets/items/ladle.png'
import useGameStore from '../../../GameStore';

function Ladle(){
  const { hasLadle } = useGameStore()

  return (
      <div className={`ladle craft-item ${hasLadle? "active" : "inactive"}`}>
        <img className="ladle-img" src={ladle}></img>
      </div>
  );
}

export default Ladle
