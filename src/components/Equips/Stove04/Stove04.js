import { useState, useEffect } from 'react'
import './Stove04.scss'
import stove04 from './../../../assets/equips/stove-3-4.png'
import Sarten from '../Sarten'

function Stove04({
  level,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  return (
    <div className="stove04">
      <img className="stove04-img" src={stove04} />
      {level > 3 && (
        <>
          <Sarten
            stoveOrder="04"
            order="01"
            landIndex={11}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="04"
            order="02"
            landIndex={12}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="04"
            order="03"
            landIndex={13}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
        </>
      )}
    </div>
  )
}

export default Stove04
