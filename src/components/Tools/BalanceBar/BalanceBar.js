import { useState, useEffect } from 'react'
import './BalanceBar.scss'
import balanceBar from './../../../assets/balance.png'
import useGameStore from './../../../GameStore'

function BalanceBar(){
  const{ mschBalance } = useGameStore()

  const convertFormat = (value) => {
    value = parseFloat(value).toFixed(2)
    return parseFloat(value) > 10 ? value : `0${value}`
  }

  return (
    <div className="balanceBar">
      <img className="balanceBar-img" src={balanceBar} />
      <span className="balanceBar-text">{convertFormat(mschBalance)}</span>
    </div>
  );
}

export default BalanceBar
