import { useState, useEffect } from 'react'
import './Stove05.scss'
import stove05 from './../../../assets/equips/stove-3-5.png'
import Sarten from '../Sarten'

function Stove05({
  level,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  return (
    <div className="stove05">
      <img className="stove05-img" src={stove05} />
      {level > 4 && (
        <>
          <Sarten
            stoveOrder="05"
            order="01"
            landIndex={14}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="05"
            order="02"
            landIndex={15}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="05"
            order="03"
            landIndex={16}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
        </>
      )}
    </div>
  )
}

export default Stove05
