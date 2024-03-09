import { useState, useEffect } from 'react'
import './Kettle.scss'
import kettle from './../../../assets/items/kettle.png'
import useGameStore from '../../../GameStore';

function Kettle(){
  const { hasKettle } = useGameStore()

  return (
      <div className={`kettle craft-item ${hasKettle? "active" : "inactive"}`}>
        <img className={`kettle-img`} src={kettle}></img>
      </div>
  );
}

export default Kettle
