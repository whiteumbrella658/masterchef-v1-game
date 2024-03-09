import { useState, useEffect } from 'react'
import './Mixer.scss'
import mixer from './../../../assets/items/mixer.png'
import useGameStore from '../../../GameStore';

function Mixer(){
  const { hasMixer } = useGameStore()

  return (
      <div className={`mixer craft-item ${hasMixer? "active" : "inactive"}`}>
        <img className="mixer-img" src={mixer}></img>
      </div>
  );
}

export default Mixer
