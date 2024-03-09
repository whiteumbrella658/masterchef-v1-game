import { useState, useEffect } from 'react'
import './Fridge.scss'
import fridge from './../../../assets/items/fridge.png'
import useGameStore from '../../../GameStore'

function Fridge() {
  const { hasFridge } = useGameStore()

  return (
    <div className={`fridge craft-item ${hasFridge ? 'active' : 'inactive'}`}>
      <img className={`fridge-img`} src={fridge}></img>
    </div>
  )
}

export default Fridge
